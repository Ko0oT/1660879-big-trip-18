import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const { type, name, count} = filter;
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${ name }" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${ name }" ${ type === currentFilterType ? 'checked' : '' } ${ count === 0 ? 'disabled' : '' }>
      <label class="trip-filters__filter-label" for="filter-${ name }">${ name }</label>
    </div>`
  );
};

const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${ filterItemsTemplate }
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class FilterView extends AbstractView {
  #filter;
  #currentFilterType;

  constructor(filter, currentFilterType) {
    super();
    this.#filter = filter;
    this.#currentFilterType = currentFilterType;
  }

  get template() {
    return createFilterTemplate(this.#filter, this.#currentFilterType);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  };
}
