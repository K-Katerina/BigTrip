import {parseTime, getDuration, createElement} from "../utils";
import {CITY_TRIP, getInOrTo, OFFERS, TYPE_TRIP_ITEM_TO} from "../const";

let MAX_OFFERS = 3;

const BLANK_TRIP_ITEM = {
  type: TYPE_TRIP_ITEM_TO[0],
  city: CITY_TRIP[0],
  timeBegin: Date.now(),
  timeEnd: Date.now(),
  cost: 0,
  favorite: false,
  offers: OFFERS,
  destination: {
    desc: ``,
    photo: ``
  }
};

const getOffers = (offers) => {
  const checkedOffers = offers.filter((offer) => offer.checked);
  return (
    checkedOffers.length > 0 ?
      `<ul class="event__selected-offers">
      ${checkedOffers.slice(0, Math.min(MAX_OFFERS, checkedOffers.length)).map((offer) =>
      `<li class="event__offer">
        <span class="event__offer-title">${offer.name}</span>
          &plus;&nbsp;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`).join(``)}
    </ul>` : ``);
};

const createTripItemTemplate = (tripItem) => {
  return (`
    <li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${tripItem.type.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${tripItem.type} ${getInOrTo(tripItem.type)} ${tripItem.city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${tripItem.timeBegin}">${parseTime(tripItem.timeBegin)}</time>
            &mdash;
            <time class="event__end-time" datetime="${tripItem.timeEnd}">${parseTime(tripItem.timeEnd)}</time>
          </p>
          <p class="event__duration">${getDuration(tripItem.timeBegin, tripItem.timeEnd)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${tripItem.cost}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        ${getOffers(tripItem.offers)}

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `);
};

export default class TripItem {
  constructor(tripItem = BLANK_TRIP_ITEM) {
    this._tripItem = tripItem;
    this._element = null;
  }

  getTemplate() {
    return createTripItemTemplate(this._tripItem);
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
