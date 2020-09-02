import TripItemView from "../view/trip-item";
import TripEditItem from "../view/trip-edit-item";
import {remove, render, RenderPosition, replace} from "../utils/render";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class TripItem {
  constructor(container, changeData, deletedData, changeMode) {
    this._container = container;
    this._changeData = changeData;
    this._deletedData = deletedData;
    this._changeMode = changeMode;
    this._tripItem = null;
    this._tripItemView = null;
    this._tripEditItemView = null;
    this._mode = Mode.DEFAULT;
    this._handleOpenClick = this._handleOpenClick.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleSubmitClick = this._handleSubmitClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(tripItem) {
    this._tripItem = tripItem;

    const prevTripItemView = this._tripItemView;
    const prevEditItemView = this._tripEditItemView;

    this._tripItemView = new TripItemView(tripItem);
    this._tripEditItemView = new TripEditItem(tripItem);

    this._tripItemView.openEditFormClickHandler(this._handleOpenClick);
    this._tripEditItemView.closeEditFormClickHandler(this._handleCloseClick);
    this._tripEditItemView.deleteEditFormClickHandler(this._handleDeleteClick);
    this._tripEditItemView.formEditSubmitHandler(this._handleSubmitClick);
    this._tripEditItemView.setFavoriteClickHandler(this._handleFavoriteClick);


    if (prevTripItemView === null || prevEditItemView === null) {
      render(this._container, this._tripItemView, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._tripItemView, prevTripItemView);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._tripEditItemView, prevEditItemView);
    }

    remove(prevTripItemView);
    remove(prevEditItemView);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceTripEditItemToTripItem();
    }
  }

  destroy() {
    remove(this._tripItemView);
    remove(this._tripEditItemView);
  }

  _handleOpenClick() {
    // открытие формы редактирования
    this._replaceTripItemToTripEditItem();
    this._tripEditItemView.updateData(this._tripItem);
  }

  _handleCloseClick() {
    // tripItem не трогать - несохранённые изменения пропадают.
    this._replaceTripEditItemToTripItem();
  }

  _handleDeleteClick(tripItem) {
    // удаление tripItem
    this._deletedData(
        Object.assign({}, tripItem)
    );
    this._replaceTripEditItemToTripItem();
  }

  _handleSubmitClick(tripItem) {
    this._changeData(
        Object.assign({}, this._tripItem, tripItem)
    );
    this._tripItemView.updateData(this._tripItem);
    this._replaceTripEditItemToTripItem();
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign({}, this._tripItem, {isFavorite: !this._tripItem.isFavorite})
    );
    this._tripEditItemView.updateData({isFavorite: this._tripItem.isFavorite});
  }

  _replaceTripItemToTripEditItem() {
    replace(this._tripEditItemView, this._tripItemView);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceTripEditItemToTripItem() {
    replace(this._tripItemView, this._tripEditItemView);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    if ([`Escape`, `Esc`].includes(evt.key)) {
      evt.preventDefault();
      this._replaceTripEditItemToTripItem();
    }
  }
}
