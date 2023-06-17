import Listeners from "./listeners.js";

const SELCTORS_SORTABLE = {
  ITEMS: "item",
  ROWS: "menu-row",
  BUTTON_ADD: ".button-add-item",
  MAX_ITEMS: 3,
};

export default class Sortable {
  constructor(callbackAdd, callbackDelete) {
    this.items = null;
    this.rows = null;
    this.current = null;
    this.listenersItem = new Listeners();
    this.listenersRow = new Listeners();
    this.callbackAdd = callbackAdd;
    this.callbackDelete = callbackDelete;

    this.createSortable();
  }

  createSortable() {
    this.items = document.getElementsByClassName(SELCTORS_SORTABLE.ITEMS);
    this.rows = document.getElementsByClassName(SELCTORS_SORTABLE.ROWS);
    this.addListenersItem();
    // this.addListenersRow([...this.rows]);
  }

  addListenersItem() {
    [...this.items].forEach((item) => {
      this.listenersItem.add(
        item,
        "dragstart",
        this.handlerDragstart.bind(this)
      );
      this.listenersItem.add(item, "dragover", this.handlerDragover.bind(this));
      this.listenersItem.add(item, "drop", this.handlerDrop.bind(this));
    });
  }

  addListenersRow() {
    [...this.rows].forEach((item) => {
      this.listenersRow.add(
        item,
        "dragstart",
        this.handlerDragstart.bind(this)
      );
      this.listenersRow.add(item, "dragover", this.handlerDragover.bind(this));
      this.listenersRow.add(item, "drop", this.handlerDrop.bind(this));
    });
  }

  handlerDragstart(event) {
    event.dataTransfer.setData("text/plain", null);
    event.dataTransfer.effectAllowed = "move";

    this.current = event.currentTarget;
  }

  handlerDragover(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  handlerDrop(event) {
    const targetElement = event.currentTarget;

    const parentElement = targetElement;
    const currentRow = this.current.parentElement;
    let menu = parentElement.parentElement;
    const parentButton = menu.parentElement.querySelector(
      SELCTORS_SORTABLE.BUTTON_ADD
    );
    const targetButton = this.current.parentElement.parentElement.querySelector(
      SELCTORS_SORTABLE.BUTTON_ADD
    );

    const targetIndex = this.getIndexInArray(menu.children, parentElement);

    const draggedIndex = this.getIndexInArray(menu.children, this.current);

    let count = this.getCountElement(parentElement);

    if (count < 3) {
      if (draggedIndex > targetIndex) {
        menu.insertBefore(this.current, parentElement);
      } else {
        menu.insertBefore(this.current, parentElement.nextSibling);
      }
    } else {
      const inputName = this.current.children[0].innerText;
      const inputValue = this.current.children[0].name;
      this.callbackAdd({ inputName, inputValue }, targetIndex);
    }

    if (currentRow.children.length === 0) {
      this.callbackDelete([currentRow.parentElement]);
    }

    const isItem = this.current.classList.contains(SELCTORS_SORTABLE.ITEMS);

    if (menu.children.length === SELCTORS_SORTABLE.MAX_ITEMS && isItem) {
      parentButton.classList.add("hidden");
    } else if (parentButton !== targetButton) {
      parentButton.classList.remove("hidden");
    }

    if (this.current.parentElement.length === SELCTORS_SORTABLE.MAX_ITEMS) {
      targetButton.classList.add("hidden");
    } else if (parentButton !== targetButton) {
      targetButton.classList.remove("hidden");
    }

    this.refresh();
  }

  getIndexInArray(array, element) {
    return Array.prototype.indexOf.call(array, element);
  }

  getCountElement(element) {
    let count = 1;
    let currentElement = element.previousElementSibling;

    while (
      currentElement !== null &&
      currentElement.classList.contains("item")
    ) {
      count++;

      if (currentElement === this.current) {
        count--;
      }
      currentElement = currentElement.previousElementSibling;
    }

    currentElement = element.nextElementSibling;

    while (
      currentElement !== null &&
      currentElement.classList.contains("item")
    ) {
      count++;

      if (currentElement === this.current) {
        count--;
      }
      currentElement = currentElement.nextElementSibling;
    }

    return count;
  }

  refresh() {
    this.listenersRow.removeAll();
    this.listenersItem.removeAll();
    this.createSortable();
  }
}
