class Cache {
  constructor() {
    this.storage = []
    this.cache = []
    this.isContain = null
  }

    get(filterResult) {
    let isContain = false

    for(let i=0; i<localStorage.length; i++) {
      let key = localStorage.key(i);
      if (JSON.stringify(filterResult) === key) {
        console.log('local');
        isContain = true
        this.storage = localStorage.getItem(key)
      }
    }

    if (!isContain) {
    this.cache = filterResult.storage
    console.log(this.cache);
    localStorage.setItem(JSON.stringify(filterResult), JSON.stringify(this.cache))
    }
    return this.cache
  }
}

