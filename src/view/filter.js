import {FilterType} from "../const";
import {Smart} from "./smart";

const createFilterTemplate = (isFutureTrip, isPastTrip, currentFilter) => {
  return (`
    <form class="trip-filters" action="#" method="get">
      <div class="trip-filters__filter">
        <input id="filter-${FilterType.EVERYTHING.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.EVERYTHING.toLowerCase()}" ${FilterType.EVERYTHING === currentFilter ? `checked` : ``}>
        <label class="trip-filters__filter-label" data-filter-type="${FilterType.EVERYTHING}" for="filter-${FilterType.EVERYTHING.toLowerCase()}">${FilterType.EVERYTHING}</label>
      </div>
      <div class="trip-filters__filter">
        <input id="filter-${FilterType.FUTURE.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.FUTURE.toLowerCase()}" ${FilterType.FUTURE === currentFilter && isFutureTrip ? `checked` : ``}>
        <label class="trip-filters__filter-label ${isFutureTrip ? `` : `filter-disabled`}" data-filter-type="${FilterType.FUTURE}" for="filter-${FilterType.FUTURE.toLowerCase()}">${FilterType.FUTURE}</label>
      </div>
      <div class="trip-filters__filter">
        <input id="filter-${FilterType.PAST.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.PAST.toLowerCase()}" ${FilterType.PAST === currentFilter && isPastTrip ? `checked` : ``}>
        <label class="trip-filters__filter-label ${isPastTrip ? `` : `filter-disabled`}" data-filter-type="${FilterType.PAST}" for="filter-${FilterType.PAST.toLowerCase()}">${FilterType.PAST}</label>
      </div>
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `);
};

export default class Filter extends Smart {
  constructor(currentFilter) {
    super();
    this._currentFilter = currentFilter;
    this._isFutureTrip = false;
    this._isPastTrip = false;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this.restoreHandlers();
  }

  restoreHandlers() {
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }

  getTemplate() {
    return createFilterTemplate(this._isFutureTrip, this._isPastTrip, this._currentFilter);
  }

  updateData(isFutureTrip, isPastTrip, updated) {
    this._isFutureTrip = isFutureTrip;
    this._isPastTrip = isPastTrip;
    this._currentFilter = updated;
    this.updateElement();
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== `LABEL` || evt.target.classList.contains(`filter-disabled`)) {
      return;
    }
    this._currentFilter = evt.target.dataset.filterType;
    this._callback.filterTypeChange(this._currentFilter);
    this.updateElement();
  }
}
