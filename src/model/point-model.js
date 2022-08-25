import { generatePoint } from '../mock/point.js';
import { offers } from '../mock/offer.js';
import { generateDestination } from '../mock/destination.js';

export default class PointModel {
  #points = Array.from({length: 20}, generatePoint);
  // Для тестирования! Не удалять!

  // #points = [
  //   {
  //     basePrice: 2000,
  //     dateFrom: '2019-07-10T22:55:56.845Z',
  //     dateTo: '2019-07-11T11:22:13.375Z',
  //     destination: 1, /*    $Destination.id$   */
  //     id: 1,
  //     isFavorite: true,
  //     offers: [1, 2, 3], /*       $Array<Offer.id>$     */
  //     type: 'taxi'
  //   },
  //   {
  //     basePrice: 2000,
  //     dateFrom: '2019-07-10T22:55:56.845Z',
  //     dateTo: '2019-07-11T11:22:13.375Z',
  //     destination: 4, /*    $Destination.id$   */
  //     id: 4,
  //     isFavorite: true,
  //     offers: [1, 2, 3], /*       $Array<Offer.id>$     */
  //     type: 'taxi'
  //   },
  //   {
  //     basePrice: 2000,
  //     dateFrom: '2019-07-10T22:55:56.845Z',
  //     dateTo: '2019-07-11T11:22:13.375Z',
  //     destination: 4, /*    $Destination.id$   */
  //     id: 4,
  //     isFavorite: true,
  //     offers: [1, 2, 3], /*       $Array<Offer.id>$     */
  //     type: 'taxi'
  //   },
  //   {
  //     basePrice: 2000,
  //     dateFrom: '2019-07-10T22:55:56.845Z',
  //     dateTo: '2019-08-12T11:22:13.375Z',
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
}
