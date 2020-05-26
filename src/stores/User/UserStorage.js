class UserStorage {
  storageKey = "user";

  get() {
    const json = localStorage.getItem(this.storageKey);

    if (json) return JSON.parse(json);

    return null;
  }

  set(data) {
    const json = JSON.stringify(data);

    localStorage.setItem(this.storageKey, json);
  }

  remove() {
    localStorage.removeItem(this.storageKey);
  }
}

export default UserStorage;
