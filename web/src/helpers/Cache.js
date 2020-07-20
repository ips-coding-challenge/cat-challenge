class Cache {
  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get(key) {
    const item = localStorage.getItem(key);
    return item && JSON.parse(item);
  }
}

export default Cache;
