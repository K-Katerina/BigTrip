import AbstractView from "./abstract-view";

const createTripInfoCostTemplate = (trips) => {
  return (`
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value"> ${trips.reduce((previousCostSum, currentTrip) => previousCostSum + getFullCostForTrip(currentTrip), 0)}</span>
    </p>
  `);
};

const getFullCostForTrip = (trip) => trip.cost + getTripOffersCost(trip);

const getTripOffersCost = (trip) => trip.offers.reduce((previousCostSum, currentOffer) => previousCostSum + currentOffer.price, 0);

export default class TripInfoCost extends AbstractView {
  constructor(trips) {
    super();
    this._trips = trips;
  }

  getTemplate() {
    return createTripInfoCostTemplate(this._trips);
  }
}
