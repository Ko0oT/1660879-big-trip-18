import { getRandomInteger } from '../utils.js';
import { descriptions, cities, pics, MIN_PICS_COUNT, MAX_PICS_COUNT } from './constants.js';

const generateDiscription = () => {
  const randomIndex = getRandomInteger(0, descriptions.length - 1);
  return descriptions[randomIndex];
};

const generateCity = () => {
  const randomIndex = getRandomInteger(0, cities.length - 1);
  return cities[randomIndex];
};

const generatePicSource = () => {
  const randomIndex = getRandomInteger(0, pics.length - 1);
  return pics[randomIndex];
};

const generatePicture = () => (
  {
    src: generatePicSource(),
    description: generateDiscription()
  }
);

let id = 1;

export const generateDestination = () => (
  {
    id: id++,
    description: generateDiscription(),
    name: generateCity(),
    pictures: Array.from({length: getRandomInteger(MIN_PICS_COUNT, MAX_PICS_COUNT)}, () => generatePicture())
  }
);
