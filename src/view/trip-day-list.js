import {createElement} from "../utils";

const createTripDayListTemplate = () => {
  return (`
    <ul class="trip-days">
    </ul>
  `);
};

export default class TripDayList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripDayListTemplate();
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
