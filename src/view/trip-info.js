import {MONTH_NAMES} from "../const";
import AbstractView from "./abstract-view";

const createTripInfoTemplate = (events) => {
  const startDay = events.length ? events.slice().sort((a, b) => a.timeBegin - b.timeBegin)[0].timeBegin : 0;
  const endDay = events.length ? events.slice().sort((a, b) => b.timeEnd - a.timeEnd)[0].timeEnd : 0;
  return (`
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main ${events.length ? `` : `visually-hidden`}">
        <h1 class="trip-info__title">${[...new Set(events.map((trip) => trip.city))].join(` &mdash; `)}</h1>
        <p class="trip-info__dates">
          ${MONTH_NAMES[new Date(startDay).getMonth()]}&nbsp;${new Date(startDay).getDate()}&nbsp;&mdash;&nbsp;${new Date(endDay).getDate()}
        </p>
      </div>
    </section>
  `);
};

export default class TripInfo extends AbstractView {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createTripInfoTemplate(this._events);
  }
}
