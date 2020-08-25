import {MONTH_NAMES} from "../const";
import AbstractView from "./abstract-view";

const createTripInfoTemplate = (trips) => {
  const startDay = trips.length ? trips.slice().sort((a, b) => a.timeBegin - b.timeBegin)[0].timeBegin : 0;
  const endDay = trips.length ? trips.slice().sort((a, b) => b.timeEnd - a.timeEnd)[0].timeEnd : 0;
  return (`
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main ${trips.length ? `` : `visually-hidden`}">
        <h1 class="trip-info__title">${[...new Set(trips.map((trip) => trip.city))].join(` &mdash; `)}</h1>
        <p class="trip-info__dates">
          ${MONTH_NAMES[new Date(startDay).getMonth()]}&nbsp;${new Date(startDay).getDate()}&nbsp;&mdash;&nbsp;${new Date(endDay).getDate()}
        </p>
      </div>
    </section>
  `);
};

export default class TripInfo extends AbstractView {
  constructor(trips) {
    super();
    this._trips = trips;
  }

  getTemplate() {
    return createTripInfoTemplate(this._trips);
  }
}
