import { FilterType } from './mock/constants.js';
import dayjs from 'dayjs';

const isFuturePoint = (it) => dayjs(it.dateFrom).isAfter(dayjs()) || dayjs(it.dateFrom).isSame(dayjs(), 'day');
const isPastPoint = (it) => dayjs(it.dateTo).isBefore(dayjs(), 'day');

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuturePoint(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastPoint(point)),
};

export { filter };
