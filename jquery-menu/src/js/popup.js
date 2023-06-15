import Listeners from "./listeners.js";

const RESIZE = {
  MD: 768,
};

export default class Popup {
  constructor(popup, buttons, body, burgerMenu, buttonsClose) {
    this.body = null;
    this.buttonsOpenPopup = null;
    this.buttonsClosePopup = null;
    this.popup = null;
    this.burgerMenu = null;

    this.listener = new Listeners();

    this.createPopup(popup, buttons, body, burgerMenu, buttonsClose);
  }

  createPopup(popup, buttons, body, burgerMenu, buttonsClose) {
    this.popup = document.querySelector(popup);
    this.body = document.getElementsByTagName(body);
    this.buttonsOpenPopup = document.querySelectorAll(buttons);

    if (buttonsClose) {
      this.buttonsClosePopup = document.querySelector(buttonsClose);
    }

    if (burgerMenu) {
      this.burgerMenu = document.querySelector(burgerMenu);
    }

    this.addListeners();
  }

  addListeners() {
    this.buttonsOpenPopup.forEach((button) => {
      button.addEventListener("click", this.openPopup.bind(this));
    });

    if (this.buttonsClosePopup) {
      this.buttonsClosePopup.addEventListener(
        "click",
        this.closePopup.bind(this)
      );
    }
  }

  closePopup(event) {
    if (
      event &&
      (!this.popup.contains(event.target) ||
        (this.buttonsClosePopup &&
          this.buttonsClosePopup.contains(event.target)) ||
        (this.burgerMenu && !this.burgerMenu.contains(event.target)))
    ) {
      Array.from(this.body).forEach((element) => {
        element.style.overflowY = "visible";
      });
      this.popup.classList.add("hidden");
    }

    if (!event) {
      this.popup.classList.add("hidden");
    }
  }

  openPopup(event) {
    event.preventDefault();
    event.stopPropagation();

    if (window.innerWidth > RESIZE.MD - 1 || this.burgerMenu) {
      if (!this.popup.classList.contains("hidden")) {
        this.popup.classList.add("hidden");
        return;
      }

      if (window.innerWidth > RESIZE.MD - 1) {
        this.listener.add(window, "resize", this.closeResize.bind(this));
      }

      this.popup.classList.remove("hidden");
      Array.from(this.body).forEach((element) => {
        element.style.overflowY = "hidden";
      });

      this.listener.add(document, "click", this.closePopup.bind(this));
    }
  }

  closeResize() {
    if (window.innerWidth < RESIZE.MD) {
      this.closePopup();
    }
    return;
  }
}
