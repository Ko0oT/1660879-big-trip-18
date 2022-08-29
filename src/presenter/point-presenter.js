import PointView from '../view/point-view';
import EditPointView from '../view/edit-point-view';
import { render, replace } from '../framework/render';

export default class PointPresenter {
  #point;
  #destination;
  #chosenOffers;
  #destinations;
  #avaliableOffers;

  #boardComponent;
  #pointComponent;
  #editPointComponent;

  constructor(boardComponent) {
    this.#boardComponent = boardComponent;
  }

  init = (point, destination, chosenOffers, destinations, avaliableOffers) => {
    this.#point = point;
    this.#destination = destination;
    this.#chosenOffers = chosenOffers;
    this.#destinations = destinations;
    this.#avaliableOffers = avaliableOffers;

    this.#pointComponent = new PointView(this.#point, this.#destination, this.#chosenOffers);
    this.#editPointComponent = new EditPointView(this.#destination, this.#destinations, this.#point, this.#avaliableOffers);


    this.#pointComponent.setClickHandler(() => {
      this.#replacePointToForm();
      document.addEventListener('keydown', this.#onEscKeyDown);
    });


    this.#editPointComponent.setFormSubmitHandler(() => {
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    });


    this.#editPointComponent.setFormClickHandler(() => {
      this.#replaceFormToPoint();
    });


    render (this.#pointComponent, this.#boardComponent);
  };


  #replacePointToForm = () => {
    replace(this.#editPointComponent, this.#pointComponent);
  };


  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#editPointComponent);
  };


  #onEscKeyDown = (evt) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };
}
