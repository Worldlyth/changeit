class Cache {
  constructor() {
    this.storage = []
  }

  isContain(filterResult) {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i)
      if (JSON.stringify(filterResult) === key) {
        this.storage = localStorage.getItem(key)
        console.log('local');
        return true
      }
  }
}

  setToCache(filterResult) { {
      this.storage = filterResult.storage
      localStorage.setItem(
        JSON.stringify(filterResult),
        JSON.stringify(this.storage)
      )
    }
    return this.storage
  }
}
