import Observer from "../utils/observer";

export default class Offers extends Observer {
  constructor() {
    super();
    this._offers = [];
  }

  setOffers(offers) {
    this._offers = offers.slice();
  }

  getAllOffers() {
    return this._offers;
  }

  getOfferForType(offerType) {
    const index = this._offers.findIndex((offer) => offer.type === offerType);

    if (index === -1) {
      throw new Error(`Not found: "${offerType}"!`);
    }
    this._notify(offerType);
    return this._offers[index];
  }
}
