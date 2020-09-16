import AbstractView from "./abstract-view";
import {MenuItem} from "../const";

const createMenuTemplate = () => {
  return (`
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" data-menu-item="${MenuItem.TABLE}" href="#">${MenuItem.TABLE}</a>
      <a class="trip-tabs__btn" data-menu-item="${MenuItem.STATS}" href="#">${MenuItem.STATS}</a>
    </nav>
  `);
};

export default class Menu extends AbstractView {

  constructor() {
    super();
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();

    if (evt.target.tagName === `A` && !evt.target.classList.contains(`trip-tabs__btn--active`)) {
      this.getElement().querySelectorAll(`a`).forEach((item) => {
        item.classList.remove(`trip-tabs__btn--active`);
      });
      evt.target.classList.add(`trip-tabs__btn--active`);
      this._callback.menuClick(evt.target.dataset.menuItem);
    }
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const item = this.getElement().querySelector(`[data-menu-item="${menuItem}"]`);
    if (item !== null) {
      item.classList.add(`trip-tabs__btn--active`);
    }
  }
}
