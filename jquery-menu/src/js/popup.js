import Listeners from "./listeners.js";
import Form from "./form.js";

const SELECTORS_POPUP = {
  BODY: "body",
  BUTTONS_OPEN: "[data-button-popup-open]",
  BUTTONS_CLOSE: "[data-button-popup-close]",
  BUTTON_DELETE: "button-delete",
  POPUP: "[data-popup]",
  POPUP_FORM: "[data-popup-form]",
};

export default class Popup {
  constructor(value) {
    this.body = document.getElementsByTagName(SELECTORS_POPUP.BODY);
    this.popup = document.querySelector(SELECTORS_POPUP.POPUP);
    this.value = value;
    this.buttonClose = document.querySelector(SELECTORS_POPUP.BUTTONS_CLOSE);
    this.buttonDelete = document.getElementById(SELECTORS_POPUP.BUTTON_DELETE);
    this.popupForm = document.querySelector(SELECTORS_POPUP.POPUP_FORM);
    this.form = new Form(this.popupForm);

    this.listener = new Listeners();
  }

  handlerClosePopup(event) {
    if (
      !this.popupForm.contains(event.target) ||
      this.buttonClose.contains(event.target)
    ) {
      this.closePopup();
    }
  }

  closePopup() {
    Array.from(this.body).forEach((element) => {
      element.style.overflowY = "visible";
    });
    this.popup.classList.add("hidden");
    this.buttonDelete.classList.add("hidden");
    this.form.buttonSubmit.setAttribute("disabled", "true");
  }

  openPopup() {
    this.popup.classList.remove("hidden");

    Array.from(this.body).forEach((element) => {
      element.style.overflowY = "hidden";
    });

    this.form.inputName.value =
      this.value.inputName === undefined ? "" : this.value.inputName;
    this.form.inputValue.value =
      this.value.inputValue === undefined ? "" : this.value.inputValue;

    this.listener.add(document, "click", this.handlerClosePopup.bind(this));
    this.listener.add(this.buttonClose, "click", this.closePopup.bind(this));
  }
}
