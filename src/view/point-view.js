import AbstractView from '../framework/view/abstract-view.js';
import { humanizeDate, humanizeTime, getTimeDiff, ucFirst } from '../utils.js';
import { createChosenOffersTemplate } from './point-chosen-offers-template.js';


const createPointTemplate = (point) => {
  const { basePrice, dateFrom, dateTo, isFavorite, type, destination, offers } = point;
  const offersArray = offers.offers;

  const setFavorite = isFavorite
    ? 'event__favorite-btn--active'
    : '';

  return (
    `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime=${ dateFrom }>${ humanizeDate(dateFrom) }</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${ ucFirst(type) } ${ destination.name } </h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime=${ dateFrom }>${ humanizeTime(dateFrom) }</time>
          &mdash;
          <time class="event__end-time" datetime=${ dateTo }>${ humanizeTime(dateTo) }</time>
        </p>
        <p class="event__duration">${ getTimeDiff(dateFrom, dateTo) }</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${ basePrice }</span>
      </p>
        ${ createChosenOffersTemplate(offersArray) }
      <button class="event__favorite-btn ${ setFavorite }" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
};


export default class PointView extends AbstractView {
  #point;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createPointTemplate(this.#point);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn ').addEventListener('click', this.#favoriteClickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}


