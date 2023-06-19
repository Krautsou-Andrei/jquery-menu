import ButtonItem from "./button-item.js";

const SELECTORS_MENU_ROW = {
  MENU_ROW: ".menu-row",
  BUTTON_ADD_ROW: "[data-add-row]",
  ROWS: "row",
};

export default class MenuRow {
  constructor(value) {
    this.row = null;
    this.createMenuRow(value);
  }

  createMenuRow(value) {
    this.row = `<div class="menu-row flex" draggable="true">
                  <div class="menu-items py-1 flex w-full justify-between gap-x-2">
                    <div class="item w-full h-7  whitespace-nowrap overflow-hidden" draggable="true">
                      <button class="button-item w-full h-full flex items-center justify-center bg-gray-300 rounded-2xl text-indigo-700 font-semibold hover:bg-gray-400" name="${value.inputValue}">${value.inputName}</button>
                    </div>                   
                  </div>
                  <button class="button-add-item my-1 group ml-2 border border-dashed border-gray-300 hover:border-gray-500 hover:text-white  inline-flex items-center justify-center px-4 py-1 hover:bg-indigo-600 rounded-full font-normal text-xs transition;">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="text-gray-400 w-5 h-5 group-hover:text-white">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6"></path>
                    </svg>
                  </button>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="button-row w-6 ml-2 text-gray-400 group-hover:text-gray-600">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                  </svg>
                </div>`;
  }

  toHTHL() {
    return this.row;
  }
}
