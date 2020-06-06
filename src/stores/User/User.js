import UserStorage from "./UserStorage";

class User {
  data = null;
  token = null;

  userStorage = new UserStorage();

  subscribers = [];

  constructor() {
    const authData = this.userStorage.get();

    if (authData) {
      this.data = authData.user;
      this.token = authData.token;
    }
  }

  setUser(data) {
    const { user, token } = data;
    this.data = user;
    this.token = token;

    this.userStorage.set(data);

    this.publish();
  }

  getToken() {
    return this.token;
  }

  remove() {
    this.data = null;
    this.token = null;

    this.userStorage.remove();

    this.publish();
  }

  isLoggedIn() {
    return Boolean(this.data);
  }

  publish() {
    this.subscribers.forEach((subscriber) => subscriber(this.data));
  }

  subscribe(fun) {
    this.subscribers.push(fun);
  }

  unsubscribe(fun) {
    const index = this.subscribers.indexOf(fun);

    if (index !== -1) {
      this.subscribers.splice(index, 1);
    }
  }
}

export default new User();
