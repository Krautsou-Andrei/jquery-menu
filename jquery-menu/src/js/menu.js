import MenuRow from "./menu-row.js";
import Popup from "./popup.js";
import Listeners from "./listeners.js";
import ButtonItem from "./button-item.js";
import Sortable from "./sortable.js";

const SELECTORS_MENU = {
  MENU: "menu",
  ROW: "menu-row",
  BUTTON_ROW: "button-row",
  BUTTON_ADD_ROW: "button-add-row",
  BUTTONS_ADD_ITEM: "button-add-item",
  BUTTON_SUBMIT: "[data-button-submit]",
  BUTTONS_EDIT: "item",
  BUTTON_ITEM: "button-item",
  BUTTON_DELETE: "button-delete",
  ITEMS: ".menu-items",
  MAX_ROWS: 5,
  MAX_ITEMS: 3,
};

export default class Menu {
  constructor() {
    this.menu = null;
    this.menuRows = null;
    this.buttonsRow = null;
    this.buttonAddRow = null;
    this.buttonsAddItems = null;
    this.buttonSubmit = null;
    this.buttonsEdit = null;
    this.buttonDelete = null;
    this.sortable = null;
    this.popup = new Popup();

    this.listeners = new Listeners();
    this.createMenu();
  }

  createMenu() {
    this.menu = document.getElementById(SELECTORS_MENU.MENU);
    this.menuRows = this.menu.children;
    this.buttonsRow = document.getElementsByClassName(
      SELECTORS_MENU.BUTTON_ROW
    );
    this.buttonSubmit = document.querySelector(SELECTORS_MENU.BUTTON_SUBMIT);
    this.buttonAddRow = document.querySelector(
      `#${SELECTORS_MENU.BUTTON_ADD_ROW}`
    );
    this.buttonsEdit = document.getElementsByClassName(
      SELECTORS_MENU.BUTTONS_EDIT
    );
    this.buttonDelete = document.getElementById(SELECTORS_MENU.BUTTON_DELETE);
    this.buttonsAddItems = document.getElementsByClassName(
      SELECTORS_MENU.BUTTONS_ADD_ITEM
    );
    this.sortable = new Sortable(
      this.addRow.bind(this),
      this.deleteElement.bind(this)
    );
    this.addListeners();
  }

  addListeners() {
    this.listeners.add(this.buttonAddRow, "click", this.viewPopup.bind(this));
    [...this.buttonsAddItems].forEach((button) => {
      this.listeners.add(button, "click", this.viewPopup.bind(this));
    });
    [...this.buttonsEdit].forEach((button) => {
      this.listeners.add(button, "click", this.viewPopup.bind(this));
    });
    [...this.buttonsRow].forEach((button) => {
      this.listeners.add(button, "mousedown", this.moveRow.bind(this));
    });
  }

  addRow(value, numberRow) {
    const row = new MenuRow(value).toHTHL();

    if (numberRow === 0) {
      this.menu.insertAdjacentHTML("beforeend", row);
      this.refresh();
    } else {
      this.menu.children[numberRow - 1].insertAdjacentHTML("afterend", row);
      this.refresh();
    }

    if (numberRow >= SELECTORS_MENU.MAX_ROWS) {
      this.buttonAddRow.classList.add("hidden");
    } else {
      this.buttonAddRow.classList.remove("hidden");
    }
  }

  addItem(value, numberRow) {
    const item = new ButtonItem(value).toHTML();

    const items = this.menuRows[numberRow].querySelector(SELECTORS_MENU.ITEMS);

    const currentButton = this.menuRows[numberRow].querySelector(
      `.${SELECTORS_MENU.BUTTONS_ADD_ITEM}`
    );

    items.insertAdjacentHTML("beforeend", item);
    this.refresh();

    if (items.children.length === SELECTORS_MENU.MAX_ITEMS) {
      currentButton.classList.add("hidden");
    } else {
      currentButton.classList.remove("hidden");
    }
  }

  handlerAdd(isRow, numberRow, currentButton) {
    const value = this.popup.form.getValue();

    if (currentButton.classList.contains(SELECTORS_MENU.BUTTON_ITEM)) {
      currentButton.innerText = value.inputName;
      currentButton.name = value.inputValue;
      this.refresh();
      return;
    }

    if (isRow) {
      const numberRow = this.menuRows.length;

      this.addRow(value, numberRow);
    } else {
      this.addItem(value, numberRow);
    }
  }

  viewPopup(event) {
    event.preventDefault();
    event.stopPropagation();

    const currentButton = event.target;
    const value = {
      inputName: event.target.innerText,
      inputValue: event.target.name,
    };

    if (currentButton.classList.contains(SELECTORS_MENU.BUTTON_ITEM)) {
      this.buttonDelete.classList.remove("hidden");
    }

    this.popup = new Popup(value);
    this.popup.openPopup();

    const isRow = event.currentTarget.id === SELECTORS_MENU.BUTTON_ADD_ROW;
    const numberRow = this.getIndexArray(
      [...this.menu.children],
      event.currentTarget.parentElement
    );

    this.addListenersForm(isRow, numberRow, currentButton);
  }

  moveRow() {
    this.sortable.listenersItem.removeAll();
    this.sortable.addListenersRow();
  }

  addListenersForm(isRow, numberRow, currentButton) {
    this.listeners.add(
      this.buttonSubmit,
      "click",
      this.handlerAdd.bind(this, isRow, numberRow, currentButton)
    );

    this.listeners.add(
      this.buttonDelete,
      "click",
      this.handlerDelete.bind(this, currentButton.parentElement)
    );
  }

  handlerDelete(element) {
    const row = element.parentElement.parentElement;
    const numberRow = this.getIndexArray([...this.menu.children], row);

    const numberItems = this.menuRows[numberRow].querySelector(
      SELECTORS_MENU.ITEMS
    ).children.length;
    if (numberItems === 1) {
      const menuItems = element.parentElement.parentElement;
      this.deleteElement([menuItems]);
    } else {
      this.deleteElement([element]);
    }
  }

  deleteElement(elements) {
    elements.forEach((element) => {
      element.remove();
    });

    this.refresh();
  }

  getIndexArray(array, element) {
    return Array.prototype.indexOf.call(array, element);
  }

  refresh() {
    this.popup.closePopup();
    this.listeners.removeAll();
    this.sortable.refresh();
    this.addListeners();
  }
}
