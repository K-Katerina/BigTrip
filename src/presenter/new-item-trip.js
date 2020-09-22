import {remove, render, RenderPosition} from "../utils/render";
import TripEditItem from "../view/trip-edit-item";
import {UpdateType, UserAction} from "../const";

export default class NewItemTrip {
  constructor(container, addData) {
    this._container = container;
    this._addData = addData;

    this._tripEditItemComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._tripEditItemComponent !== null) {
      return;
    }
    this._tripEditItemComponent = new TripEditItem();
    this._tripEditItemComponent.formEditSubmitHandler(this._handleFormSubmit);
    this._tripEditItemComponent.deleteEditFormClickHandler(this._handleCloseClick);

    render(this._container, this._tripEditItemComponent, RenderPosition.AFTERFIRSTCHILD);

    document.querySelector(`.trip-main__event-add-btn`).setAttribute(`disabled`, `true`);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (!this._tripEditItemComponent) {
      return;
    }
    remove(this._tripEditItemComponent);
    this._tripEditItemComponent = null;
    document.querySelector(`.trip-main__event-add-btn`).removeAttribute(`disabled`);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  setSaving() {
    this._tripEditItemComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._tripEditItemComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this._tripEditItemComponent.shake(resetFormState);
  }

  _handleFormSubmit(trip) {
    this._addData(
        UserAction.ADD,
        UpdateType.MAJOR,
        trip
    );
  }

  _handleCloseClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
