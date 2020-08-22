import {createElement} from "../utils";
import {MONTH_NAMES} from "../const";

const createTripInfoTemplate = (tripItemArray, days) => {
  const startDay = days[0] || 0;
  const endDay = days[days.length - 1] || 0;
  return (`
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main ${tripItemArray.length ? `` : `visually-hidden`}">
        <h1 class="trip-info__title">${[...new Set(tripItemArray.map((trip) => trip.city))].join(` &mdash; `)}</h1>
        <p class="trip-info__dates">
          ${MONTH_NAMES[new Date(startDay).getMonth()]}&nbsp;${new Date(startDay).getDate()}&nbsp;&mdash;&nbsp;${new Date(endDay).getDate()}
        </p>
      </div>
    </section>
  `);
};

export default class TripInfo {
  constructor(tripInfo, days) {
    this._tripInfo = tripInfo;
    this._days = days;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._tripInfo, this._days);
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
