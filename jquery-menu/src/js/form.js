const SELECTORS_FORM = {
  INPUT_NAME: "[data-input-name]",
  INPUT_VALUE: "[data-input-value]",
  BUTTON_SUBMIT: "[data-button-submit]",
};

export default class Form {
  constructor(form) {
    this.form = form;
    this.inputName = null;
    this.inputValue = null;
    this.buttonSubmit = null;

    this.createFormField();
  }

  createFormField() {
    this.inputName = this.form.querySelector(SELECTORS_FORM.INPUT_NAME);
    this.inputValue = this.form.querySelector(SELECTORS_FORM.INPUT_VALUE);
    this.buttonSubmit = this.form.querySelector(SELECTORS_FORM.BUTTON_SUBMIT);

    this.inputName.addEventListener("input", this.handlerChange.bind(this));
    this.inputValue.addEventListener("input", this.handlerChange.bind(this));
    this.buttonSubmit.addEventListener("click", this.getValue.bind(this));
  }

  handlerChange(event) {
    if (event.target.value.length > 0) {
      this.buttonSubmit.removeAttribute("disabled");
    } else {
      this.buttonSubmit.setAttribute("disabled", "true");
    }
  }

  getValue() {
    return {
      inputName: this.inputName.value,
      inputValue: this.inputValue.value,
    };
  }
}
