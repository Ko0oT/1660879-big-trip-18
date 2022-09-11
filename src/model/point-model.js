import Observable from '../framework/observable.js';
import { generatePoint } from '../mock/point.js';
import { offers } from '../mock/offer.js';
import { generateDestination } from '../mock/destination.js';

export default class PointModel extends Observable {
  #points = Array.from({length: 4}, generatePoint);
  // Для тестирования! Не удалять!

  // #points = [
  //   {
  //     basePrice: 4000,
  //     dateFrom: '2019-07-07T22:55:56.845Z',
  //     dateTo: '2019-07-11T11:22:13.375Z',
  //     destination: 1, /*    $Destination.id$   */
  //     id: 1,
  //     isFavorite: true,
  //     offers: [1, 2, 3], /*       $Array<Offer.id>$     */
  //     type: 'taxi'
  //   },
  //   {
  //     basePrice: 1000,
  //     dateFrom: '2019-07-10T22:55:56.845Z',
  //     dateTo: '2019-07-21T11:22:13.375Z',
  //     destination: 3, /*    $Destination.id$   */
  //     id: 3,
  //     isFavorite: true,
  //     offers: [1, 2, 3], /*       $Array<Offer.id>$     */
  //     type: 'taxi'
  //   },
  //   {
  //     basePrice: 2000,
  //     dateFrom: '2019-07-01T22:55:56.845Z',
  //     dateTo: '2019-08-11T11:22:13.375Z',
  //     destination: 4, /*    $Destination.id$   */
  //     id: 4,
  //     isFavorite: true,
  //     offers: [1, 2, 3], /*       $Array<Offer.id>$     */
  //     type: 'taxi'
  //   },
  //   {
  //     basePrice: 3000,
  //     dateFrom: '2019-08-15T22:55:56.845Z',
  //     dateTo: '2019-08-19T11:22:13.375Z',
  //     destination: 2, /*    $Destination.id$   */
  //     id: 2,
  //     isFavorite: true,
  //     offers: [1, 2, 3], /*       $Array<Offer.id>$     */
  //     type: 'taxi'
  //   },
  // ];

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


  updatePoint = (updateType, update) => {
    const index = this.#points.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error ('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  };


  addPoint = (updateType, update) => {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  };


  deletePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error ('Can\'t delete unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.points.slice(index + 1),
    ];

    this._notify(updateType);
  };


  getDestinationById(pointDestination) {
    const destination = this.#destinations.find((it) => it.id === pointDestination);
    return destination;
  }


  getOffersById(point) {
    const pointOffers = this.#offers.find((it) => it.type === point.type).offers;
    const avaliableOffers = pointOffers.filter((it) => point.offers.includes(it.id));
    return avaliableOffers;
  }


  getAllOffersByPoints(pointsArr) {
    const result = [];
    pointsArr.forEach((it) => result.push(...(this.getOffersById(it))));
    return result;
  }


  getIdByDestination(destinationName) {
    const {id} = this.#destinations.find((it) => it.name === destinationName);
    return id;
  }
}
