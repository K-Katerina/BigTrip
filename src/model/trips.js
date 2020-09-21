import Observer from "../utils/observer";
import DestinationModel from "../model/destination";

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
          city: trip.destination.name,
          timeBegin: trip.date_from !== null ? new Date(trip.date_from) : trip.date_from,
          timeEnd: trip.date_to !== null ? new Date(trip.date_to) : trip.date_to,
          cost: +trip.base_price,
          isFavorite: trip.is_favorite,
          offers: [...trip.offers],
          destination: {
            desc: trip.destination.description,
            photo: [...trip.destination.pictures]
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
    const destination = DestinationModel.getDestinationsForCity(trip.city);
    const adaptedDestination = Object.assign({}, destination, {
      "name": trip.city,
      "description": destination.desc,
      "pictures": destination.photo
    });
    delete adaptedDestination.city;
    delete adaptedDestination.desc;
    delete adaptedDestination.photo;

    const adaptedTrip = Object.assign(
        {},
        trip,
        {
          "base_price": +trip.cost,
          "date_from": trip.timeBegin instanceof Date ? trip.timeBegin.toISOString() : null,
          "date_to": trip.timeEnd instanceof Date ? trip.timeEnd.toISOString() : null,
          "destination": adaptedDestination,
          "is_favorite": trip.isFavorite,
          "offers": trip.offers
        }
    );

    delete adaptedTrip.cost;
    delete adaptedTrip.city;
    delete adaptedTrip.timeBegin;
    delete adaptedTrip.timeEnd;
    delete adaptedTrip.isFavorite;

    return adaptedTrip;
  }
}
