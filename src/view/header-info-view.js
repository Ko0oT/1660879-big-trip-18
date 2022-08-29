import AbstractView from '../framework/view/abstract-view.js';
import { getDates, getCityNames, getTotalPrice } from '../utils.js';


const createHeaderInfoTemplate = (points, destinations, chosenOffers) => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${ getCityNames(points, destinations) }</h1>

      <p class="trip-info__dates">${ getDates(points) }</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${ getTotalPrice(points, chosenOffers) }</span>
    </p>
  </section>`
);

export default class HeaderInfoView extends AbstractView {
  #points;
  #destinations;
  #allChosenOffers;

  constructor(points, destinations, allChosenOffers) {
    super();
    this.#points = points;
    this.#destinations = destinations;
    this.#allChosenOffers = allChosenOffers;
  }

  get template() {
    return createHeaderInfoTemplate(this.#points, this.#destinations, this.#allChosenOffers);
  }
}
