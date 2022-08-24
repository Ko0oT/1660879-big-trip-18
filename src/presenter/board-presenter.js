import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import BoardView from '../view/board-view.js';
import NoPointsView from '../view/no-points-view.js';
import SortView from '../view/sort-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  #boardContainer;
  #pointModel;

  #boardComponent = new BoardView();

  #boardPoints;
  #boardDestinations;
  #boardOffers;
  #chosenOffers;
  #avaliableOffers;
  #boardDestination;

  constructor(boardContainer, pointModel) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
  }


  init = () => {

    this.#boardPoints = [...this.#pointModel.points];
    this.#boardDestinations = [...this.#pointModel.destinations];
    this.#boardOffers = [...this.#pointModel.offers];

    this.#renderBoard();
  };


  #renderPoint = (point, destination, chosenOffers, destinations, avaliableOffers) => {
    const pointComponent = new PointView(point, destination, chosenOffers);
    const editPointComponent = new EditPointView(destination, destinations, point, avaliableOffers);


    const replacePointToForm = () => {
      this.#boardComponent.element.replaceChild(editPointComponent.element, pointComponent.element);
    };


    const replaceFormToPoint = () => {
      this.#boardComponent.element.replaceChild(pointComponent.element, editPointComponent.element);
    };


    const onEscKeyDown = (evt) => {
      if (evt.key === 'Esc' || evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };


    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });


    editPointComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });


    editPointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToPoint();
    });


    render (pointComponent, this.#boardComponent.element);
  };


  #renderBoard = () => {
    if (this.#boardPoints.length === 0) {

      render(new NoPointsView(), this.#boardContainer);

    } else {

      render(this.#boardComponent, this.#boardContainer);
      render(new SortView(), this.#boardComponent.element);

      for (let i = 0; i < this.#boardPoints.length; i++) {

        this.#boardDestination = this.#boardDestinations.find((it) => it.id === this.#boardPoints[i].destination);
        this.#chosenOffers = this.#boardOffers.find((it) => it.type === this.#boardPoints[i].type).offers; //надо доработать, чтобы отрисовывались только выбранные, сделаю позже
        this.#avaliableOffers = this.#boardOffers.find((it) => it.type === this.#boardPoints[i].type).offers;

        this.#renderPoint(this.#boardPoints[i], this.#boardDestination, this.#chosenOffers, this.#boardDestinations, this.#avaliableOffers);

      }
    }
  };
}

