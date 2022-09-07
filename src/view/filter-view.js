import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';


const createFilterTemplate = (points) => {

  const hasFuturePoints = points.some((it) => dayjs(it.dateFrom).isAfter(dayjs()) || dayjs(it.dateFrom).isSame(dayjs(), 'day'));
  const hasPastPoints = points.some((it) => dayjs(it.dateTo).isBefore(dayjs(), 'day'));

  return (
    `<form class="trip-filters" action="#" method="get">
      <div class="trip-filters__filter">
        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
        <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" ${ hasFuturePoints ? '' : 'disabled' }>
        <label class="trip-filters__filter-label" for="filter-future">Future</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" ${ hasPastPoints ? '' : 'disabled' }>
        <label class="trip-filters__filter-label" for="filter-past">Past</label>
      </div>

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class FilterView extends AbstractView {
  #points;

  constructor(points) {
    super();
    this.#points = points;
  }

  get template() {
    return createFilterTemplate(this.#points);
  }
}
