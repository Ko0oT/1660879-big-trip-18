import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { humanizeDateAndTime, getTimeDiff } from '../utils.js';
import { types } from '../mock/constants.js';
import { createDestinationTemplate } from './edit-point-destination-template.js';
import { createAvaliableOffersTemplate } from './edit-point-avaliable-offers-template.js';
import { createPointsMenuTemplate } from './edit-point-points-menu-template.js';
import { createDatalistOptionTemplate } from './edit-point-datalist-option-template.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';


const createEditPointTemplate = (pointModel, point) => {
  const destination = pointModel.getDestinationById(point.destination);
  const offersArray = pointModel.getOffersById(point);
  const { description, pictures } = destination;
  const { type, dateFrom, dateTo, basePrice } = point;
  const destinations = [...pointModel.destinations];

  const isSubmitEnabled = () => getTimeDiff(dateFrom, dateTo);

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
            <select class="event__input  event__input--destination" id="event-destination-1" name="event-destination">
              ${ createDatalistOptionTemplate(destinations, destination) }
            </select>
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

          <button class="event__save-btn  btn  btn--blue" type="submit" ${ isSubmitEnabled() ? '' : 'disabled' }>Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
              ${ offersArray[0] ? createAvaliableOffersTemplate(offersArray) : '' }
              ${ description ? createDestinationTemplate(description, pictures) : '' }
        </section>
      </form>
    </li>`
  );
};

export default class EditPointView extends AbstractStatefulView {
  #pointModel;
  #startDatepicker = null;
  #endDatepicker = null;

  constructor(pointModel, point) {
    super();
    this.#pointModel = pointModel;
    this._state = EditPointView.parsePointToState(point);
    this.#setInnerHandlers();
    this.#setStartDatepicker();
    this.#setEndDatepicker();

  }

  get template() {
    return createEditPointTemplate(this.#pointModel, this._state);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#startDatepicker) {
      this.#startDatepicker.destroy();
      this.#startDatepicker = null;
    }

    if (this.#endDatepicker) {
      this.#endDatepicker.destroy();
      this.#endDatepicker = null;
    }
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setStartDatepicker();
    this.#setEndDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormArrowClickHandler(this._callback.formClick);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditPointView.parseStateToPoint(this._state));
  };

  setFormArrowClickHandler = (callback) => {
    this._callback.formClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formArrowClickHandler);
  };

  #formArrowClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.formClick();
  };

  #changePointTypeHandler = (evt) => {
    if (evt.target.tagName === 'INPUT') {
      this.updateElement({
        type: evt.target.value
      });
    }
  };

  #changeDestinationHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      destination: this.#pointModel.getIdByDestination(evt.target.value)
    });
  };

  #startDateChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #endDateChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: Number(evt.target.value)
    });
  };

  #setStartDatepicker = () => {
    this.#startDatepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        'time_24hr': true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        onClose: this.#startDateChangeHandler,
      }
    );
  };

  #setEndDatepicker = () => {
    this.#endDatepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        'time_24hr': true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onClose: this.#endDateChangeHandler,
      }
    );
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group').addEventListener('click', this.#changePointTypeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#changeDestinationHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);
  };

  static parsePointToState = (point) => ({...point});

  static parseStateToPoint = (state) => {
    const point = {...state};
    return point;
  };

}
