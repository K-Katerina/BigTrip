import {SORT} from "../const";
import AbstractView from "./abstract-view";

const createSortTemplate = (currentSortType = SORT.EVENT) => {
  return (`
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item trip-sort__item--day"> ${currentSortType === SORT.EVENT ? `day` : ``}</span>

      <div class="trip-sort__item trip-sort__item--${SORT.EVENT}">
        <input id="sort-${SORT.EVENT}" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-${SORT.EVENT}" ${currentSortType === SORT.EVENT ? `checked` : ``}>
        <label class="trip-sort__btn" for="sort-${SORT.EVENT}" data-sort-type="${SORT.EVENT}" >${SORT.EVENT}</label>
      </div>

      <div class="trip-sort__item trip-sort__item--${SORT.TIME}">
        <input id="sort-${SORT.TIME}" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-${SORT.TIME}" ${currentSortType === SORT.TIME ? `checked` : ``}>
        <label class="trip-sort__btn" for="sort-${SORT.TIME}" data-sort-type="${SORT.TIME}">${SORT.TIME}</label>
      </div>

      <div class="trip-sort__item trip-sort__item--${SORT.PRICE}">
        <input id="sort-${SORT.PRICE}" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-${SORT.PRICE}" ${currentSortType === SORT.PRICE ? `checked` : ``}>
        <label class="trip-sort__btn" for="sort-${SORT.PRICE}" data-sort-type="${SORT.PRICE}">${SORT.PRICE}</label>
      </div>

      <span class="trip-sort__item  trip-sort__item--offers">offers</span>
    </form>
  `);
};

export default class Sort extends AbstractView {
  constructor() {
    super();
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `LABEL`) {
      return;
    }
    evt.preventDefault();
    this._currentSortType = evt.target.dataset.sortType;
    this._callback.sortTypeChange(this._currentSortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
