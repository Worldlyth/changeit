class Cache {
  constructor() {
    this.cache = []
    this.storage = []
    this.filter = null
    this.sortByLettersStamp = "none"
    this.sortByDateStamp = "none"
  }

  setToLocalStorage() {
    const cacheObject = {
      searchValue: blog.filterInput.value,
      sortingByLetters: blog.selectSortingByLetters.value,
      sortingByDate: blog.selectSortingByDate.value,
      posts: blog.storage
    }
    let posts = []
    let isConstain = false

    for(let i=0; i<localStorage.length; i++) {
      let key = localStorage.key(i);
      if (JSON.stringify(cacheObject) === key) {
        posts = localStorage.getItem(key)
        console.log('local');
        isConstain = true
      }
    }

    if (!isConstain) {
    posts = blog.filteredStorage
    console.log(posts);
    localStorage.setItem(JSON.stringify(cacheObject), JSON.stringify(posts))
    }
    return posts
    console.log('');
  }

}
