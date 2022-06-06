const validatorSettings = {
    form: document.querySelector(".checklist__form"),
    firstName: form.getElementsByTagName("input")[0],
    lastName: form.getElementsByTagName("input")[1],
    email: form.getElementsByTagName("input")[2],
    date: form.getElementsByTagName("input")[3]
}

const blogSettings = {
    form: document.querySelector("#blogForm"),
    title: document.querySelector("#blogTitle"),
    text: document.querySelector("#blogText"),
    storage: [],
    filteredStorage: [],
    sortedStorage: [],
    filterInput: document.querySelector("#filter"),
    selectSortingByLetters: document.querySelector("#selectSortingByLetters"),
    selectSortingByDate: document.querySelector('#selectSortingByDate'),
    filterResult:{},
    sortByLettersStamp: 'none',
    sortByDateStamp: 'none',
    blogStorage: document.querySelector(".stories__blog"),
}