import AbstractView from "./abstract-view";
import {replace} from "../utils/render";

export class Smart extends AbstractView {
  constructor() {
    super();
    this._data = {};
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate Abstract, only concrete one.`);
    }
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: restoreHandlers`);
  }

  updateElement() {
    const oldElement = this.getElement();
    this.removeElement();
    const newElement = this.getElement();
    replace(newElement, oldElement);
    this.restoreHandlers();
  }

  updateData(updated, justDataUpdating) {
    this._data = Object.assign({}, this._data, updated);
    if (justDataUpdating) {
      return;
    }
    this.updateElement();
  }
}
