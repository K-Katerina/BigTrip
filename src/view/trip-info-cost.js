import {createElement} from "../utils";

const createTripInfoCostTemplate = (tripItemArray) => {
  return (`
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value"> ${tripItemArray.reduce((a, b) => a + b.cost, 0)}</span>
    </p>
  `);
};

export default class TripInfoCost {
  constructor(tripInfoCost) {
    this._tripInfoCost = tripInfoCost;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoCostTemplate(this._tripInfoCost);
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
