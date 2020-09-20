import Observer from "../utils/observer";

export default class Trips extends Observer {
  constructor() {
    super();
    this._trips = [];
  }

  setTrips(updateType, trips) {
    this._trips = trips.slice();
    this._notify(updateType);
  }

  getTrips() {
    return this._trips;
  }

  updateTripItem(updateType, update) {
    const index = this._trips.findIndex((trip) => trip.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting trip`);
    }

    this._trips = [
      ...this._trips.slice(0, index),
      update,
      ...this._trips.slice(index + 1)
    ];

    this._notify(updateType, update);
  }


  addTripItem(updateType, update) {
    this._trips = [
      update,
      ...this._trips
    ];

    this._notify(updateType, update);
  }

  deleteTripItem(updateType, update) {
    const index = this._trips.findIndex((trip) => trip.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting trip`);
    }

    this._trips = [
      ...this._trips.slice(0, index),
      ...this._trips.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(trip) {
    const adaptedTrip = Object.assign(
        {},
        trip,
        {
          city: ``,
          timeBegin: new Date(trip.date_from),
          timeEnd: new Date(trip.date_to),
          cost: trip.base_price,
          isFavorite: trip.is_favorite,
          offers: [],
          destination: {
            desc: ``,
            photo: [`http://localhost:8080/img/logo.png`]
          }
        }
    );

    delete adaptedTrip.date_from;
    delete adaptedTrip.date_to;
    delete adaptedTrip.base_price;
    delete adaptedTrip.is_favorite;

    return adaptedTrip;
  }

  static adaptToServer(trip) {
    const adaptedTrip = Object.assign(
        {},
        trip,
        {
          "base_price": trip.cost,
          "date_from": new Date(trip.timeBegin),
          "date_to": new Date(trip.timeEnd),
          "destination": ``,
          "is_favorite": trip.isFavorite,
          "offers": []
        }
    );

    delete adaptedTrip.cost;
    delete adaptedTrip.timeBegin;
    delete adaptedTrip.timeEnd;
    delete adaptedTrip.isFavorite;

    return adaptedTrip;
  }
}
