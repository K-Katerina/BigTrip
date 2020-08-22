import {MONTH_NAMES} from "../const";
import {createElement} from "../utils";

const createTripDayTemplate = (day, index) => {
  const date = new Date(day);
  return (`
    <li class="trip-days__item day">
      <div class="day__info">
        <span class="day__counter">${index + 1}</span>
        <time class="day__date" datetime="${date}">${MONTH_NAMES[date.getMonth()]} ${date.getDate()}</time>
      </div>
    </li>
  `);
};

export default class TripDay {
  constructor(tripDay, index) {
    this._tripDay = tripDay;
    this._index = index;
    this._element = null;
  }

  getTemplate() {
    return createTripDayTemplate(this._tripDay, this._index);
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
