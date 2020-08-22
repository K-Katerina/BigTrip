import {MONTH_NAMES} from "../const";
import AbstractView from "./abstract-view";

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

export default class TripInfo extends AbstractView {
  constructor(tripInfo, days) {
    super();
    this._tripInfo = tripInfo;
    this._days = days;
  }

  getTemplate() {
    return createTripInfoTemplate(this._tripInfo, this._days);
  }
}
