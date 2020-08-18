import {SORT} from "../const";

export const createSort = () => {
  return (`
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--${SORT[0]}">${SORT[0]}</span>

      ${SORT.slice(1, SORT.length - 1).map((sort, index) =>
      `<div class="trip-sort__item trip-sort__item--${sort}">
        <input id="sort-${sort}" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-${sort}" ${index === 0 ? `checked` : ``}>
        <label class="trip-sort__btn" for="sort-${sort}">${sort}</label>
      </div>`).join(``)}

      <span class="trip-sort__item  trip-sort__item--${SORT[SORT.length - 1]}">${SORT[SORT.length - 1]}</span>
    </form>
`);
};
