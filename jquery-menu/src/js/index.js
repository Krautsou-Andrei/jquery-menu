import Popup from "./popup.js";

const SELECTORS_POPUP = {
  BODY: "body",
  BUTTONS_OPEN: "[data-button-popup-open]",
  BUTTONS_CLOSE: "[data-button-popup-close]",
  POPUP: "[data-popup]",
  POPUP_FORM: "[data-popup-form]",
};

const popup = new Popup(
  SELECTORS_POPUP.POPUP,
  SELECTORS_POPUP.BUTTONS_OPEN,
  SELECTORS_POPUP.BODY,
  SELECTORS_POPUP.POPUP_FORM,
  SELECTORS_POPUP.BUTTONS_CLOSE
);
