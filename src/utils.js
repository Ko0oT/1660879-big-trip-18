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


export { getRandomInteger, humanizeDate, humanizeTime, getTimeDiff, ucFirst, humanizeDateAndTime };
