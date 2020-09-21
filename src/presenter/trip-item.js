import TripItemView from "../view/trip-item";
import TripEditItem from "../view/trip-edit-item";
import {remove, render, RenderPosition, replace} from "../utils/render";
import {UpdateType, UserAction} from "../const";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class TripItem {
  constructor(container, changeData, changeMode) {
    this._container = container;
    this._changeData = changeData;
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
      replace(this._tripItemView, prevEditItemView);
      this._mode = Mode.DEFAULT;
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
    this._replaceTripItemToTripEditItem();
    this._tripEditItemView.updateData(this._tripItem);
  }

  _handleCloseClick() {
    this._replaceTripEditItemToTripItem();
  }

  _handleDeleteClick(tripItem) {
    this._changeData(
        UserAction.DELETE,
        UpdateType.MINOR,
        Object.assign({}, tripItem)
    );
    this._replaceTripEditItemToTripItem();
  }

  _handleSubmitClick(tripItem) {
    const isOldTime = this._tripItem.timeBegin === tripItem.timeBegin && this._tripItem.timeEnd === tripItem.timeEnd;
    const isOldCost = this._tripItem.cost === tripItem.cost;
    this._changeData(
        UserAction.UPDATE,
        isOldTime && isOldCost ? UpdateType.PATCH : UpdateType.MINOR,
        Object.assign({}, this._tripItem, tripItem)
    );
    this._replaceTripEditItemToTripItem();
  }

  _handleFavoriteClick() {
    this._changeData(
        UserAction.UPDATE,
        null,
        Object.assign({}, this._tripItem, {isFavorite: !this._tripItem.isFavorite})
    );
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
