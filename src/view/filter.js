import {FILTER} from "../const";

export const createFilter = () => {
  return (`
    <h2 class="visually-hidden">Filter events</h2>
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
