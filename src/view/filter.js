import {FILTER} from "../const";
import {createElement} from "../utils";

const createFilterTemplate = () => {
  return (`
    <form class="trip-filters" action="#" method="get">
      ${FILTER.map((filter, index) =>
      `<div class="trip-filters__filter">
        <input id="filter-${filter.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.toLowerCase()}" ${index === 0 ? `checked` : ``}>
        <label class="trip-filters__filter-label" for="filter-${filter.toLowerCase()}">${filter}</label>
      </div>`).join(``)}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `);
};

export default class Filter {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
