import AbstractView from '../framework/view/abstract-view.js';
import { getDates, getCityNames, getTotalPrice } from '../utils.js';


const createHeaderInfoTemplate = (points, destinations, offers) => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${ getCityNames(points, destinations) }</h1>

      <p class="trip-info__dates">${ getDates(points) }</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${ getTotalPrice(points, offers) }</span>
    </p>
  </section>`
);

export default class HeaderInfoView extends AbstractView {
  #points;
  #destinations;
  #offers;
  // #allChosenOffers;

  constructor(points, destinations, offers) {
    super();
    this.#points = points;
    this.#destinations = destinations;
    // this.#allChosenOffers = allChosenOffers;
    this.#offers = offers;
  }

  get template() {
    return createHeaderInfoTemplate(this.#points, this.#destinations, this.#offers);
  }
}
