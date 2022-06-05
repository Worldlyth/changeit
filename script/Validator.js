class Validator {
  constructor(settings) {
    this.form = settings.form
    this.firstName = settings.firstName
    this.lastName = settings.lastName
    this.email = settings.email
    this.date = settings.date
  }

  showCorrect(field) {
    field.classList.add("field-correct");
    field.classList.remove("field-error");
  }

  showError(field, errorMessage) {
    const isContain =
      field.nextElementSibling?.classList.contains("error-text");

    const errorText = document.createElement("div");
    errorText.textContent = "*The field must be" + errorMessage;

    if (!isContain) {
      errorText.classList.add("error-text");
      field.after(errorText);
    }

    field.addEventListener("focus", () => {
      field.classList.remove("field-error");
      errorText.remove();
    });

    field.classList.add("field-error");
    field.classList.remove("field-correct");
  }

  validateFields(field) {
    if (field.value.length < 3) {
      const errorMessage = " more than 3 letters";
      this.showError(field, errorMessage);
      return field
    }
  }

  validateNames(field) {

    const regName = /^[a-zA-Z\s]*$/;
    const regCapitalized = /^[A-Z\s]*$/;

    if (!regCapitalized.test(field.value.charAt(0))) {
      const errorMessage = " capitalized";
      this.showError(field, errorMessage);
    } else if (!field.value) {
      const errorMessage = " filled";
      this.showError(field, errorMessage);
    } else if (!regName.test(field.value)) {
      const errorMessage = " contained only letters";
      this.showError(field, errorMessage);
    } else {
      this.showCorrect(field);
    }
    this.validateFields(field);
  }

  validateEmail(field) {
    this.validateFields(field);
    const regEmail =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!regEmail.test(field.value)) {
      const errorMessage = " matched to Email format";
      this.showError(field, errorMessage);
    } else {
      this.showCorrect(field);
    }
  }

  validateDate(field) {
    const fieldDate = Date.parse(field.value)

    const regDate = /^\d{2}\.\d{2}\.\d{4}$/ ;

    if (!regDate.test(field.value)) {
      const errorMessage = " matched to DD.MM.YYYY format"
      this.showError(field,errorMessage)
    } else {
      this.showCorrect(field)
    }

    const nowDate = new Date()
    const timeStamp = Date.parse(nowDate)
    
    if (fieldDate > timeStamp) {
      const errorMessage = " Date that not letter than the current one"
      this.showError(field,errorMessage)
    }

  }
}
