import {parseTime, getDuration, getInOrTo} from "../utils";

let MAX_OFFERS = 3;

const getOffers = (offers) => {
  let offersList = ``;
  for (let i = 0; i < Math.min(MAX_OFFERS, offers.length); i++) {
    offersList +=
    `<li class="event__offer">
      <span class="event__offer-title">${offers[i].name}</span>
      &plus;&nbsp;&euro;&nbsp;
      <span class="event__offer-price">${offers[i].price}</span>
    </li>`;
  }
  return (
    offers.length > 0 ?
      `<ul class="event__selected-offers">
        ${offersList}
      </ul>` : ``);
};

export const createTripItem = (tripItem) => {
  return (`
    <li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${tripItem.type}.png" alt="Event type icon">
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
