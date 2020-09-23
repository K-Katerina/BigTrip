export default class Offers {

  static setOffers(offers = []) {
    this._offers = offers.slice();
  }

  static getOffersForType(offerType) {
    const index = this._offers.findIndex((offer) => offer.type === offerType);
    if (index === -1) {
      throw new Error(`Offers not found for type: "${offerType}"!`);
    }
    return this._offers[index].offers;
  }
}
