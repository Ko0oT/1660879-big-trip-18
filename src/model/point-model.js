import { generatePoint } from '../mock/point.js';
import { offers } from '../mock/offer.js';
import { generateDestination } from '../mock/destination.js';

export default class PointModel {
  #points = Array.from({length: 20}, generatePoint);
  #offers = offers;
  #destinations = Array.from({length: 20}, generateDestination);

  get points () {
    return this.#points;
  }

  get offers () {
    return this.#offers;
  }

  get destinations () {
    return this.#destinations;
  }
}
