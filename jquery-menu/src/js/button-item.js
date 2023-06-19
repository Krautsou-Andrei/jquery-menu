export default class ButtonItem {
  constructor(value) {
    this.button = null;
    this.createButton(value);
  }

  createButton(value) {
    this.button = `<div class="item w-full h-7  whitespace-nowrap overflow-hidden" draggable="true">
    <button class="button-item w-full h-full flex items-center justify-center bg-gray-300 rounded-2xl text-indigo-700 font-semibold hover:bg-gray-400" name="${value.inputValue}">${value.inputName}</button>
                   </div>`;
  }

  toHTML() {
    return this.button;
  }
}
