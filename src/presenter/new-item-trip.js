import {remove, render, RenderPosition} from "../utils/render";
import TripEditItem from "../view/trip-edit-item";
import {getId} from "../mock/trip-item";

export default class NewItemTrip {
  constructor(container, data) {
    this._container = container;
    this._data = data;

    this._tripEditItemComponent = null;
    this._destroyCallback = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(callback) {
    this._destroyCallback = callback;

    if (this._tripEditItemComponent !== null) {
      return;
    }

    this._tripEditItemComponent = new TripEditItem();
    this._tripEditItemComponent.formEditSubmitHandler(this._handleFormSubmit);
    this._tripEditItemComponent.deleteEditFormClickHandler(this._handleDeleteClick);

    render(this._container, this._tripEditItemComponent, RenderPosition.AFTERFIRSTCHILD);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (!this._tripEditItemComponent) {
      return;
    }

    if (this._destroyCallback) {
      this._destroyCallback();
    }

    remove(this._tripEditItemComponent);
    this._tripEditItemComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleFormSubmit(trip) {
    this._data(
        Object.assign({id: getId()}, trip)
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
