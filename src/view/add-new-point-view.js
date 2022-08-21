// Вьюшку впоследстие объединю с вью редактирования, пока не удалял

//  Destination
// {
//   id: getRandomInteger(1, cities.length), к примеру 5
//   description: generateDiscription(),
//   name: generateCity(),  к примеру Москва
//   pictures: Array.from({length: getRandomInteger(MIN_PICS_COUNT, MAX_PICS_COUNT)}, () => generatePicture())
// }

// Point
// {
//   basePrice: getRandomInteger(MIN_PRICE, MAX_PRICE),
//   dateFrom: '2019-07-10T22:55:56.845Z',
//   dateTo: '2019-07-11T11:22:13.375Z',
//   destination: 2,/*     $Destination.id$  [1,2,3,4,5] */
//   id: id++, //id++
//   isFavorite: Boolean(getRandomInteger(0, 1)),
//   offers: [1, 2, 3], /*       $Array<Offer.id>$    [1,3,5]  */
//   type: generateType()
// }

import { createElement } from '../render.js';
import { findValueInDictionary, getRandomInteger } from '../utils.js';
import { icons, types } from '../mock/constants.js';
import { createEventPhotoTemplate } from './add-new-point-destination-template.js';
import { createAvaliableOffersTemplate } from './add-new-point-avaliable-offers-template.js';
import { createPointsMenuTemplate } from './add-new-point-points-menu-template.js';
import { createDatalistOptionTemplate } from './add-new-point-datalist-option-template.js';


const createAddNewPointTemplate = (destinations, points, offers) => {
  const randomDestination = destinations[getRandomInteger(0, destinations.length - 1)];
  const { id, description, name, pictures } = randomDestination;

  const point = points.find((it) => it.id === id);

  const avaliableOffers = offers.find((it) => it.type === point.type).offers;


  return (
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src=${findValueInDictionary(icons, point.type)} alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createPointsMenuTemplate(types)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${point.type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${name} list="destination-list-1">
        <datalist id="destination-list-1">
          ${createDatalistOptionTemplate(destinations)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${createAvaliableOffersTemplate(avaliableOffers)}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${createEventPhotoTemplate(pictures)}
          </div>
        </div>
      </section>
    </section>
    </form>
  </li>`
  );
};

export default class AddNewPointView {
  constructor(destinations, points, offers) {
    this.destinations = destinations;
    this.points = points;
    this.offers = offers;
  }

  getTemplate() {
    return createAddNewPointTemplate(this.destinations, this.points, this.offers);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
