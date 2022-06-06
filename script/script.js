const validatorSettings = {
  form: document.querySelector(".checklist__form"),
  firstName: form.getElementsByTagName("input")[0],
  lastName: form.getElementsByTagName("input")[1],
  email: form.getElementsByTagName("input")[2],
  date: form.getElementsByTagName("input")[3],
}

const validator = new Validator(validatorSettings)

validator.form.addEventListener("submit", function (evt) {
  evt.preventDefault()
  validator.validateNames(validator.firstName)
  validator.validateNames(validator.lastName)
  validator.validateEmail(validator.email)
  validator.validateDate(validator.date)
})

const blogSettings = {
  form: document.querySelector("#blogForm"),
  title: document.querySelector("#blogTitle"),
  text: document.querySelector("#blogText"),
  storage: [],
  filteredStorage: [],
  sortedStorage: [],
  filterInput: document.querySelector("#filter"),
  selectSortingByLetters: document.querySelector("#selectSortingByLetters"),
  selectSortingByDate: document.querySelector("#selectSortingByDate"),
  blogStorage: document.querySelector(".stories__blog"),
  filterResult: {}
}

const blog = new Blog(blogSettings)

blog.form.addEventListener("submit", (e) => {
  e.preventDefault()
  blog.setPostToStorage()
  blog.render(blog.storage)
  blog.resetFields()
})

blog.selectSortingByLetters.addEventListener("change", () => {
  blog.selectSortingByDate.value = ""
  if (blog.filterInput.value) {
    blog.sortByLetters(blog.filteredStorage)
    blog.setFilterResult(blog.sortedStorage)
  } else {
    blog.sortByLetters(blog.storage)
    blog.setFilterResult(blog.sortedStorage)
  }
})

blog.selectSortingByDate.addEventListener("change", () => {
  blog.selectSortingByLetters.value = ""
  if (blog.filterInput.value) {
    blog.sortByDate(blog.filteredStorage)
  } else {
    blog.sortByDate(blog.storage)
  }
})

blog.filterInput.addEventListener("input", () => {
  if (blog.selectSortingByLetters.value) {
    blog.filter(blog.sortedStorage)
    blog.setFilterResult(blog.filteredStorage)
  } else {
    blog.filter(blog.storage)
    blog.setFilterResult(blog.filteredStorage)
  }
})

const cache = new Cache()

blog.selectSortingByLetters.addEventListener("change", () => {
  if (!cache.isContain(blog.filterResult)) {
    cache.setToCache(blog.filterResult)
  }
})

blog.selectSortingByDate.addEventListener("change", () => {
  if (!cache.isContain(blog.filterResult)) {
    cache.setToCache(blog.filterResult)
  }
})

blog.filterInput.addEventListener("input",()=>{
  if (!cache.isContain(blog.filterResult) && blog.filterInput.value) {
    cache.setToCache(blog.filterResult)
  }
})