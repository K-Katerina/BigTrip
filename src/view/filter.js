import {FILTER, FILTER_DEFAULT} from "../const";
import {Smart} from "./smart";

const createFilterTemplate = (currentFilter) => {
  return (`
    <form class="trip-filters" action="#" method="get">
      <div class="trip-filters__filter">
        <input id="filter-${FILTER.EVERYTHING.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FILTER.EVERYTHING.toLowerCase()}" ${FILTER.EVERYTHING === currentFilter ? `checked` : ``}>
        <label class="trip-filters__filter-label" data-filter-type="${FILTER.EVERYTHING}" for="filter-${FILTER.EVERYTHING.toLowerCase()}">${FILTER.EVERYTHING}</label>
      </div>
      <div class="trip-filters__filter">
        <input id="filter-${FILTER.FUTURE.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FILTER.FUTURE.toLowerCase()}" ${FILTER.FUTURE === currentFilter ? `checked` : ``}>
        <label class="trip-filters__filter-label" data-filter-type="${FILTER.FUTURE}" for="filter-${FILTER.FUTURE.toLowerCase()}">${FILTER.FUTURE}</label>
      </div>
      <div class="trip-filters__filter">
        <input id="filter-${FILTER.PAST.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FILTER.PAST.toLowerCase()}" ${FILTER.PAST === currentFilter ? `checked` : ``}>
        <label class="trip-filters__filter-label" data-filter-type="${FILTER.PAST}" for="filter-${FILTER.PAST.toLowerCase()}">${FILTER.PAST}</label>
      </div>
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `);
};

export default class Filter extends Smart {
  constructor(currentFilter = FILTER_DEFAULT) {
    super();
    this._currentFilter = currentFilter;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this.restoreHandlers();
  }

  restoreHandlers() {
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }

  getTemplate() {
    return createFilterTemplate(this._currentFilter);
  }

  updateData(updated) {
    this._currentFilter = updated;
    this.updateElement();
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
  }

  _filterTypeChangeHandler(evt) {
    if (evt.target.tagName !== `LABEL`) {
      return;
    }
    evt.preventDefault();
    this._currentFilter = evt.target.dataset.filterType;
    this._callback.filterTypeChange(this._currentFilter);
    this.updateElement();
  }
}
