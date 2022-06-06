class Blog {
  constructor(settings) {
    this.form = settings.form
    this.title = settings.title
    this.text = settings.text
    this.storage = settings.storage
    this.filteredStorage = settings.filteredStorage
    this.sortedStorage = settings.sortedStorage
    this.filterInput = settings.filterInput
    this.selectSortingByLetters = settings.selectSortingByLetters
    this.selectSortingByDate = settings.selectSortingByDate
    this.blogStorage = settings.blogStorage
    this.filterResult = settings.filterResult
  }

  formatDate() {
    const date = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
      seconds: new Date().getSeconds(),
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

  sortByLetters(arr) {
    this.sortedStorage = [...arr]
    if (this.selectSortingByLetters.value) {
      if (this.selectSortingByLetters.value === "AZ") {
        this.sortedStorage = this.sortByA(this.sortedStorage)
      } else if (this.selectSortingByLetters.value === "ZA") {
        this.sortedStorage = this.sortByZ(this.sortedStorage)
      }
      this.render(this.sortedStorage)
    } else {
      this.render(arr)
    }
  }

  sortByDate(arr) {
    if (this.selectSortingByDate.value === "dateUp") {
      arr.sort((a, b) => {
        return Date.parse(a.date) - Date.parse(b.date)
      })
    } else if (this.selectSortingByDate.value === "dateDown") {
      arr.sort((a, b) => {
        return Date.parse(b.date) - Date.parse(a.date)
      })
    }
    this.render(arr)
  }

  filter(arr) {
    if (this.filterInput.value) {
      this.filteredStorage = [...arr]
      this.filteredStorage = this.filteredStorage.filter((post) => {
        if (
          post.title
            .toLowerCase()
            .includes(this.filterInput.value.toLowerCase())
        ) {
          return post
        }
      })
      this.render(this.filteredStorage)
    } else if (this.selectSortingByLetters.value) {
      this.sortByLetters(this.storage)
    } else if (this.selectSortingByDate.value) {
      this.sortByDate(this.storage)
    } else {
      this.render(arr)
    }
  }

  resetFields () {
    this.selectSortingByLetters.value = ""
    this.selectSortingByDate.value = ""
    this.title.value = ""
    this.text.value = ""
  }

  setFilterResult (arr) {
    this.filterResult = {
      filter: blog.filterInput.value,
      sortingByLetters: blog.selectSortingByLetters.value,
      sortingByDate: blog.selectSortingByDate.value,
      storage: arr,
    }
    return this.filterResult
  }
}
