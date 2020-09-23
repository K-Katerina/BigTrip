export default class Destination {

  static setDestinations(destinationsArray = []) {
    this._destinations = [];
    destinationsArray.forEach((destination) => {
      const adaptedDestination = Object.assign(
          {},
          destination,
          {
            city: destination.name,
            destination: {
              desc: destination.description,
              photo: [...destination.pictures]
            }
          }
      );

      delete adaptedDestination.name;
      delete adaptedDestination.description;
      delete adaptedDestination.pictures;
      this._destinations.push(adaptedDestination);
    });
  }

  static getDestinations() {
    return this._destinations;
  }

  static getDestinationsForCity(city) {
    const index = this._destinations.findIndex((item) => item.city === city);
    if (index === -1) {
      throw new Error(`Destinations not found for city: "${city}"!`);
    }
    return this._destinations[index].destination;
  }
}
