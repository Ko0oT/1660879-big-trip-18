import dayjs from 'dayjs';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeDate = (date) => dayjs(date).format('MMM D');

const humanizeTime = (time) => dayjs(time).format('HH:mm');

const humanizeDateAndTime = (date) => dayjs(date).format('DD/MM/YY HH:mm');

const getTimeDiff = (dateFrom, dateTo) => {
  const diff = dayjs(dateTo).diff(dateFrom, 'minute');
  if (diff < 60) {
    const minutes = diff ? diff : '00';
    return `${minutes}M`;
  }
  if (diff < 1440) {
    const hours = Math.trunc(diff / 60);
    const minutes = diff % 60 ? diff % 60 : '00';
    return `${hours}H ${minutes}M`;
  } else {
    const days = Math.trunc(diff / 60 / 24);
    const hours = Math.trunc(diff / 60 % 24) ? Math.trunc(diff / 60 % 24) : '00';
    const minutes = diff % 60 ? diff % 60 : '00';
    return `${days}D ${hours}H ${minutes}M`;
  }
};

const ucFirst = (str) => {
  if (!str) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);
};

const getDates = (pointsArr) => {
  const dateA = pointsArr[0].dateFrom;
  const dateB = pointsArr[pointsArr.length - 1].dateTo;

  if (dayjs(dateA).isSame(dayjs(dateB), 'day')) {
    return `${dayjs(dateA).format('MMM D')}`;
  }

  if (dayjs(dateA).isSame(dayjs(dateB), 'month')) {
    return `${dayjs(dateA).format('MMM D')} &mdash; ${dayjs(dateB).format('D')}`;
  }

  return `${dayjs(dateA).format('MMM D')} &mdash; ${dayjs(dateB).format('MMM D')}`;
};

const getCityNames = (pointsArr, destArr) => {
  const result = [];
  let repeat = null;
  pointsArr.forEach((el)=>{
    if(el.destination.id !== repeat){
      result.push(el.destination.id);
      repeat = el.destination.id;
    }
  });

  if (result.length === 1) {
    const cityA = destArr.find((it) => it.id === result[0]);
    return cityA.name;
  }

  if (result.length === 2) {
    const cityA = destArr.find((it) => it.id === result[0]);
    const cityB = destArr.find((it) => it.id === result[1]);
    return `${cityA.name} &mdash; ${cityB.name}`;
  }

  if (result.length === 3) {
    const cityA = destArr.find((it) => it.id === result[0]);
    const cityB = destArr.find((it) => it.id === result[1]);
    const cityC = destArr.find((it) => it.id === result[2]);
    return `${cityA.name} &mdash; ${cityB.name} &mdash; ${cityC.name}`;
  }

  if (result.length > 3) {
    const cityA = destArr.find((it) => it.id === result[0]);
    const cityZ = destArr.find((it) => it.id === result[result.length - 1]);
    return `${cityA.name} &mdash; ... &mdash; ${cityZ.name}`;
  }
};

const getTotalPrice = (pointsArr, offersArr) => {
  const baseTotalPrice = pointsArr.reduce((prev, cur) => prev + cur.basePrice, 0);
  // const offersTotalPrice = offersArr.reduce((prev, cur) => prev + cur.price, 0);
  // return baseTotalPrice + offersTotalPrice;

  //буду думать как посчитать сумму выбранных офферов исходя из новых условий
  return baseTotalPrice;
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export { getRandomInteger, humanizeDate, humanizeTime, getTimeDiff, ucFirst, humanizeDateAndTime, getDates, getCityNames, getTotalPrice, updateItem };
