const validator = new Validator(validatorSettings);

validator.form.addEventListener("submit", function (evt) {
  evt.preventDefault();
  validator.validateNames(validator.firstName);
  validator.validateNames(validator.lastName);
  validator.validateEmail(validator.email);
  validator.validateDate(validator.date);
});

const blog = new Blog(blogSettings);

blog.form.addEventListener("submit", (e) => {
  e.preventDefault();
  blog.setPostToStorage();
  blog.render(blog.storage);
  blog.selectSortingByLetters.value = "";
  blog.selectSortingByDate.value = "";
  blog.title.value = "";
  blog.text.value = "";
});

blog.selectSortingByLetters.addEventListener("change", () => {
  blog.selectSortingByDate.value = "";
  if (blog.filterInput.value) {
    blog.sortByLetters(blog.filteredStorage);
  } else {
    blog.sortByLetters(blog.storage);
  }
});

blog.selectSortingByDate.addEventListener("change", () => {
  blog.selectSortingByLetters.value = "";
  if (blog.filterInput.value) {
    blog.sortByDate(blog.filteredStorage);
  } else {
    blog.sortByDate(blog.storage);
  }
});

blog.filterInput.addEventListener("input", () => {
  if (blog.selectSortingByLetters.value) {
    blog.filter(blog.sortedStorage);
  } else {
    blog.filter(blog.storage);
  }
  cache.setToLocalStorage()
});

const cache = new Cache();
 