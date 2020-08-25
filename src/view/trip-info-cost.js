import AbstractView from "./abstract-view";

const createTripInfoCostTemplate = (trips) => {
  return (`
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value"> ${trips.reduce((a, b) => a + b.cost, 0)}</span>
    </p>
  `);
};

export default class TripInfoCost extends AbstractView {
  constructor(trips) {
    super();
    this._trips = trips;
  }

  getTemplate() {
    return createTripInfoCostTemplate(this._trips);
  }
}
