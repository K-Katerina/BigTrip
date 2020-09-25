import {SortType, SORT_DEFAULT} from "../const";
import {Smart} from "./smart";

const createSortTemplate = (currentSortType = SortType.EVENT) => {
  return (`
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item trip-sort__item--day"> ${currentSortType === SortType.EVENT ? `day` : ``}</span>

      <div class="trip-sort__item trip-sort__item--${SortType.EVENT}">
        <input id="sort-${SortType.EVENT}" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.EVENT}" ${currentSortType === SortType.EVENT ? `checked` : ``}>
        <label class="trip-sort__btn" for="sort-${SortType.EVENT}" data-sort-type="${SortType.EVENT}" >${SortType.EVENT}</label>
      </div>

      <div class="trip-sort__item trip-sort__item--${SortType.TIME}">
        <input id="sort-${SortType.TIME}" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.TIME}" ${currentSortType === SortType.TIME ? `checked` : ``}>
        <label class="trip-sort__btn" for="sort-${SortType.TIME}" data-sort-type="${SortType.TIME}">${SortType.TIME}</label>
      </div>

      <div class="trip-sort__item trip-sort__item--${SortType.PRICE}">
        <input id="sort-${SortType.PRICE}" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.PRICE}" ${currentSortType === SortType.PRICE ? `checked` : ``}>
        <label class="trip-sort__btn" for="sort-${SortType.PRICE}" data-sort-type="${SortType.PRICE}">${SortType.PRICE}</label>
      </div>

      <span class="trip-sort__item  trip-sort__item--offers">offers</span>
    </form>
  `);
};

export default class Sort extends Smart {
  constructor(currentSortType = SORT_DEFAULT) {
    super();
    this._currentSortType = currentSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this.restoreHandlers();
  }

  restoreHandlers() {
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }

  getTemplate() {
    return createSortTemplate(this._currentSortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `LABEL`) {
      return;
    }
    evt.preventDefault();
    this._currentSortType = evt.target.dataset.sortType;
    this._callback.sortTypeChange(this._currentSortType);
    this.updateElement();
  }
}
