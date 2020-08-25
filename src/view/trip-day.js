import {MONTH_NAMES} from "../const";
import AbstractView from "./abstract-view";

const createTripDayTemplate = (day, index, isSortedByEvent) => {
  const date = new Date(day);
  return (`
    <li class="trip-days__item day">
      <div class="day__info">
        <span class="day__counter">${isSortedByEvent ? index + 1 : ``}</span>
        <time class="day__date" datetime="${date}">${isSortedByEvent ? (MONTH_NAMES[date.getMonth()] + ` ` + date.getDate()) : ``}</time>
      </div>
    </li>
  `);
};

export default class TripDay extends AbstractView {
  constructor(tripDay, index, isSortedByEvent) {
    super();
    this._tripDay = tripDay;
    this._index = index;
    this._isSortedByEvent = isSortedByEvent;
  }

  getTemplate() {
    return createTripDayTemplate(this._tripDay, this._index, this._isSortedByEvent);
  }
}
