import {FILTER, FILTER_DEFAULT} from "../const";
import AbstractView from "./abstract-view";

const createFilterTemplate = (currentFilter) => {
  return (`
    <form class="trip-filters" action="#" method="get">
      <div class="trip-filters__filter">
        <input id="filter-${FILTER.EVERYTHING.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FILTER.EVERYTHING.toLowerCase()}" ${FILTER.EVERYTHING === currentFilter ? `checked` : ``}>
        <label class="trip-filters__filter-label" for="filter-${FILTER.EVERYTHING.toLowerCase()}">${FILTER.EVERYTHING}</label>
      </div>
      <div class="trip-filters__filter">
        <input id="filter-${FILTER.FUTURE.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FILTER.FUTURE.toLowerCase()}" ${FILTER.FUTURE === currentFilter ? `checked` : ``}>
        <label class="trip-filters__filter-label" for="filter-${FILTER.FUTURE.toLowerCase()}">${FILTER.FUTURE}</label>
      </div>
      <div class="trip-filters__filter">
        <input id="filter-${FILTER.PAST.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FILTER.PAST.toLowerCase()}" ${FILTER.PAST === currentFilter ? `checked` : ``}>
        <label class="trip-filters__filter-label" for="filter-${FILTER.PAST.toLowerCase()}">${FILTER.PAST}</label>
      </div>
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `);
};

export default class Filter extends AbstractView {
  constructor() {
    super();
    this._currentFilter = FILTER_DEFAULT;
  }

  getTemplate() {
    return createFilterTemplate(this._currentFilter);
  }
}
