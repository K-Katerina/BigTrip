export default class Offers {

  static setOffers(offers = []) {
    this._offers = offers.slice();
  }

  static getAllOffers() {
    return this._offers;
  }

  static getOfferForType(offerType) {
    const index = this._offers.findIndex((offer) => offer.type === offerType);

    if (index === -1) {
      throw new Error(`Not found: "${offerType}"!`);
    }
    return this._offers[index].offers;
  }
}
