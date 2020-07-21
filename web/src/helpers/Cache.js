class Cache {
  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get(key) {
    const item = localStorage.getItem(key);
    return item && JSON.parse(item);
  }

  // TODO
  static remember(key, callback, ttl) {
    let value = localStorage.get(key);

    if (value) {
      // Check if value has expired
      // if(value.expir)
      return value;
    }
  }
}

export default Cache;
