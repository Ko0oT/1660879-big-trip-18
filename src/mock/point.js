import { getRandomInteger } from '../utils.js';
import { types, MIN_PRICE, MAX_PRICE } from './constants.js';
import { nanoid } from 'nanoid';

const generateType = () => {
  const randomIndex = getRandomInteger(0, types.length - 1);
  return types[randomIndex];
};

let id = 0;

export const generatePoint = () => (
  {
    basePrice: getRandomInteger(MIN_PRICE, MAX_PRICE),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: id++, /*    $Destination.id$   */
    id: nanoid(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: [1, 2, 3], /*       $Array<Offer.id>$     */
    type: generateType()
  }
);
