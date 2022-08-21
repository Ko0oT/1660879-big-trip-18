//Описание точки маршрута
const descriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  'Cras aliquet varius magna, non porta ligula feugiat eget',
  'Fusce tristique felis at fermentum pharetra',
  'Aliquam id orci ut lectus varius viverra',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui',
  'Sed sed nisi sed augue convallis suscipit in sed felis',
  'Aliquam erat volutpat',
  'Nunc fermentum tortor ac porta dapibus',
  'In rutrum ac purus sit amet tempus'
];

//Названия городов (destionations)
const cities = [
  'Moscow',
  'Petrozavodsk',
  'Vladivostok',
  'Yakutsk',
  'Novosibirsk',
  'Oha',
  'Kaliningrad'
];

//Тип точки маршрута
const types = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];


//Изображения
const pics = [
  'http://picsum.photos/248/152?r=1',
  'http://picsum.photos/248/152?r=2',
  'http://picsum.photos/248/152?r=3',
  'http://picsum.photos/248/152?r=4',
  'http://picsum.photos/248/152?r=5',
  'http://picsum.photos/248/152?r=6',
  'http://picsum.photos/248/152?r=7',
  'http://picsum.photos/248/152?r=8',
];


const MIN_PICS_COUNT = 2;
const MAX_PICS_COUNT = 5;
const MIN_PRICE = 20;
const MAX_PRICE = 4999;

export { descriptions, cities, pics, MIN_PICS_COUNT, MAX_PICS_COUNT, types, MIN_PRICE, MAX_PRICE };
