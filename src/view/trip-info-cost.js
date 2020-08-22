import AbstractView from "./abstract-view";

const createTripInfoCostTemplate = (tripItemArray) => {
  return (`
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value"> ${tripItemArray.reduce((a, b) => a + b.cost, 0)}</span>
    </p>
  `);
};

export default class TripInfoCost extends AbstractView {
  constructor(tripInfoCost) {
    super();
    this._tripInfoCost = tripInfoCost;
  }

  getTemplate() {
    return createTripInfoCostTemplate(this._tripInfoCost);
  }
}
