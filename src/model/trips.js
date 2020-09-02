export default class Trips {
  constructor() {
    this._trips = [];
  }

  setTrips(updateType, trips) {
    this._trips = trips.slice();
    // this._notify(updateType);
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

    // this._notify(updateType, update);
  }


  addTripItem(updateType, update) {
    this._trips = [
      update,
      ...this._trips
    ];

    // this._notify(updateType, update);
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

    // this._notify(updateType);
  }
}
