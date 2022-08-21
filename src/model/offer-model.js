import { offers } from '../mock/offer.js';

export default class OfferModel {
  offers = offers;
  get = () => this.offers;
}
