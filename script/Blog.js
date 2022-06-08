class Blog {
  constructor(settings) {
    this.form = settings.form
    this.title = settings.title
    this.text = settings.text
    this.storage = settings.storage
    this.filteredStorage = settings.filteredStorage
    this.sortedStorage = settings.sortedStorage
    this.sortedFilteredStorage = settings.sortedFilteredStorage
    this.filterInput = settings.filterInput
    this.selectSortingByLetters = settings.selectSortingByLetters
    this.selectSortingByDate = settings.selectSortingByDate
    this.filterResult = settings.filterResult
    this.blogStorage = settings.blogStorage
  }

  formatDate() {
    const date = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
    }

    for (let key in date) {
      if (date[key] < 10) date[key] = `0${date[key]}`
    }

    return `${date.year}-${date.month}-${date.day} ${date.hours}:${date.minutes}`
  }

  setPostData() {
    const postDate = this.formatDate()
    const postData = {
      title: this.title.value,
      text: this.text.value,
      date: postDate,
    }
    return postData
  }

  setPostToStorage() {
    const post = this.setPostData()
    this.storage.push(post)
  }

  render(arr) {
    this.blogStorage.innerHTML = ""

    arr.forEach((item) => {
      this.blogStorage.innerHTML += `
         <div class="blog__item bg_pink">
                <div class="item__title">
                ${item.title}
                  <div class="item__creation-date">${item.date}</div>
                </div>
                <div class="item__text">${item.text}</div>
              </div>
         `
    })
  }

  sortByA(arr) {
    return arr.sort((a, b) => {
      if (a.title < b.title) {
        return -1
      }
      if (a.title > b.title) {
        return 1
      }
      return 0
    })
  }

  sortByZ(arr) {
    return arr.sort((a, b) => {
      if (a.title < b.title) {
        return 1
      }
      if (a.title > b.title) {
        return -1
      }
      return 0
    })
  }

  sortByDateUp(arr) {
    console.log("sort")
    arr.sort((a, b) => {
      return Date.parse(a.date) - Date.parse(b.date)
    })
  }

  sortByDateDown(arr) {
    console.log("sort")
    arr.sort((a, b) => {
      return Date.parse(b.date) - Date.parse(a.date)
    })
  }

  sortByDate(arr) {
    if (this.selectSortingByDate.value) {
      if (this.selectSortingByDate.value === "dateUp") {
        this.sortByDateUp(arr)
      } else if (this.selectSortingByDate.value === "dateDown") {
        this.sortByDateDown(arr)
      }
    } else {
      this.render(blog.storage)
    }
    this.render(arr)
  }

  sortByLetters(arr) {
    if (this.selectSortingByLetters.value) {
      if (this.selectSortingByLetters.value === "AZ") {
        if (cache.isContain()) {
          blog.render(cache.storage)
          console.log("local")
        } else {
          this.sortedStorage = [...arr]
          this.sortedStorage = this.sortByA(this.sortedStorage)
          console.log("sort")

          this.setFilterResult()
          cache.set(blog.filterResult, this.sortedStorage)
          this.render(this.sortedStorage)
        }
      } else if (this.selectSortingByLetters.value === "ZA") {
        if (cache.isContain()) {
          blog.render(cache.storage)
          console.log("local")
        } else {
          this.sortedStorage = [...arr]
          this.sortedStorage = this.sortByZ(this.sortedStorage)
          console.log("sort")

          this.setFilterResult()
          cache.set(blog.filterResult, this.sortedStorage)
          this.render(this.sortedStorage)
        }
      }
    } else {
      this.render(arr)
    }
  }

  filter(arr) {
    if (cache.isContain()) {
      if (blog.filterInput.value) {
        blog.render(cache.storage)
        console.log("local")
      }
    } else {
      if (this.filterInput.value) {
        this.filteredStorage = [...arr]
        this.filteredStorage = this.filteredStorage.filter((post) => {
          if (
            post.title
              .toLowerCase()
              .includes(this.filterInput.value.toLowerCase())
          ) {
            console.log("filter")
            return post
          }
        })
        this.setFilterResult()
        cache.set(this.filterResult, this.filteredStorage)
        this.render(this.filteredStorage)
      } else if (this.selectSortingByLetters.value) {
        this.sortByLetters(this.storage)
      } else if (this.selectSortingByDate.value) {
        this.sortByDate(this.storage)
      } else {
        this.render(arr)
      }
    }
  }

  resetFields() {
    this.selectSortingByLetters.value = ""
    this.selectSortingByDate.value = ""
    this.title.value = ""
    this.text.value = ""
  }

  setFilterResult() {
    this.filterResult = {
      filter: blog.filterInput.value,
      sortingByLetters: blog.selectSortingByLetters.value,
      sortingByDate: blog.selectSortingByDate.value,
      key: this.storage.length,
    }
  }
}
