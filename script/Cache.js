class Cache {
  constructor() {
    this.storage = []
  }

  isContain() {
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i)
        let parsedItem = JSON.parse(key)
        if (
          parsedItem.key === blog.storage.length &&
          parsedItem.filter === blog.filterInput.value &&
          blog.selectSortingByLetters.value === parsedItem.sortingByLetters &&
          blog.selectSortingByDate.value === parsedItem.sortingByDate
        ) {
          cache.storage = localStorage.getItem(key)
          cache.storage = JSON.parse(cache.storage)
          return true
        }
      }
  }

  set(filterResult, storage) {
    localStorage.setItem(JSON.stringify(filterResult), JSON.stringify(storage))
  }
}

// let isContain = false

// if (blog.filterInput.value) {
// for(let i = 0; i < localStorage.length; i++) {
//   let key = localStorage.key(i)
//   let parsedItem = JSON.parse(key)
//   if (parsedItem.key.length === blog.storage.length && parsedItem.filter === blog.filterInput.value) {
//     cache.storage = localStorage.getItem(JSON.stringify(blog.filterResult))
//     cache.storage = JSON.parse(cache.storage)
//     blog.render(cache.storage)
//     isContain = true
//   }
//  }
