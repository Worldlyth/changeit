class Cache {
  constructor() {
    this.storage = []
    this.cache = []
    this.request = {}
  }

  setToLocalStorage(object) {
    localStorage.setItem(JSON.stringify(object), JSON.stringify(object.storage))

    // let posts = []
    // let isConstain = false

    // for(let i=0; i<localStorage.length; i++) {
    //   let key = localStorage.key(i);
    //   if (JSON.stringify(object) === key) {
    //     posts = localStorage.getItem(key)
    //     console.log('local');
    //     isConstain = true
    //   }
    // }

    // if (!isConstain && blog.filterInput.value) {
    // posts = blog.filteredStorage
    // console.log(posts);

    // }
    // return posts

  }
}
