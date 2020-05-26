import UserStorage from "./UserStorage";

class User {
  data = null;

  userStorage = new UserStorage();

  subscribers = [];

  constructor() {
    const user = this.userStorage.get();

    if (user) {
      this.data = user;
    }
  }

  setUser(user) {
    this.data = user;
    this.userStorage.set(user);

    this.publish();
  }

  remove() {
    this.data = null;
    this.userStorage.remove();

    this.publish();
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
      this.subscribers.array.splice(index, 1);
    }
  }
}

export default new User();
