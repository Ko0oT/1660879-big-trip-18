import { createElement } from '../render.js';
import { humanizeDateAndTime } from '../utils.js';
import { types } from '../mock/constants.js';
import { createDestinationTemplate } from './add-new-point-destination-template.js';
import { createAvaliableOffersTemplate } from './add-new-point-avaliable-offers-template.js';
import { createPointsMenuTemplate } from './add-new-point-points-menu-template.js';
import { createDatalistOptionTemplate } from './add-new-point-datalist-option-template.js';


const createEditPointTemplate = (chosenDestination, destinations, point, avaliableOffers) => {
  const { description, name, pictures } = chosenDestination;
  const { type, dateFrom, dateTo, basePrice } = point;

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${ type }.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${ createPointsMenuTemplate(types) }
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${ type }
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${ name } list="destination-list-1">
            <datalist id="destination-list-1">
              ${ createDatalistOptionTemplate(destinations) }
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${ humanizeDateAndTime(dateFrom) }">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${ humanizeDateAndTime(dateTo) }">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${ basePrice }">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
              ${ avaliableOffers[0] ? createAvaliableOffersTemplate(avaliableOffers) : '' }
              ${ description ? createDestinationTemplate(description, pictures) : '' }
        </section>
      </form>
    </li>`
  );
};

export default class EditPointView {
  constructor(chosenDestination, destinations, point, avaliableOffers) {
    this.chosenDestination = chosenDestination;
    this.destinations = destinations;
    this.point = point;
    this.avaliableOffers = avaliableOffers;
  }

  getTemplate() {
    return createEditPointTemplate(this.chosenDestination, this.destinations, this.point, this.avaliableOffers);
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
