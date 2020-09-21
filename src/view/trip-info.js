import {MONTH_NAMES} from "../const";
import AbstractView from "./abstract-view";

const getTitle = (trips) => {
  if (trips.length) {
    const firstCity = trips[0].city;
    const lastCity = trips[trips.length - 1].city;
    const allCities = [...new Set(trips.map((trip) => trip.city))];
    return allCities.length > 3 ? firstCity + ` &mdash;... &mdash; ` + lastCity : allCities.join(` &mdash; `);
  }
  return ``;
};

const getDate = (trips) => {
  const startDay = trips.length ? trips.slice().sort((a, b) => a.timeBegin - b.timeBegin)[0].timeBegin : 0;
  const endDay = trips.length ? trips.slice().sort((a, b) => b.timeEnd - a.timeEnd)[0].timeEnd : 0;
  if (new Date(startDay).getMonth() !== new Date(endDay).getMonth()) {
    return new Date(startDay).getDate() + `&nbsp;` + MONTH_NAMES[new Date(startDay).getMonth()] + `&nbsp;&mdash;&nbsp;` + new Date(endDay).getDate() + `&nbsp;` + MONTH_NAMES[new Date(endDay).getMonth()];
  }
  return MONTH_NAMES[new Date(startDay).getMonth()] + `&nbsp;` + new Date(startDay).getDate() + `&nbsp;&mdash;&nbsp;` + new Date(endDay).getDate();
};

const createTripInfoTemplate = (trips) => {
  return (`
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main ${trips.length ? `` : `visually-hidden`}">
        <h1 class="trip-info__title">${getTitle(trips)}</h1>
        <p class="trip-info__dates">${getDate(trips)}</p>
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
