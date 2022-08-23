// import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import BoardView from '../view/board-view.js';
import { render, RenderPosition } from '../render.js';

export default class BoardPresenter {
  #boardContainer;
  #pointModel;

  #boardComponent = new BoardView();

  #boardPoints;
  #boardDestinations;
  #boardOffers;
  #chosenDestination;
  #boardPoint;
  #avaliableOffers;
  #boardDestination;
  #chosenOffers;

  init = (boardContainer, pointModel) => {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;

    this.#boardPoints = [...this.#pointModel.points];
    this.#boardDestinations = [...this.#pointModel.destinations];
    this.#boardOffers = [...this.#pointModel.offers];

    this.#chosenDestination = this.#boardDestinations[0];


    render(this.#boardComponent, this.#boardContainer);


    this.#boardPoint = this.#boardPoints.find((it) => it.id === this.#chosenDestination.id);
    this.#avaliableOffers = this.#boardOffers.find((it) => it.type === this.#boardPoint.type).offers;

    // render(new EditPointView(this.#chosenDestination, this.#boardDestinations, this.#boardPoint, this.#avaliableOffers), this.#boardComponent.element, RenderPosition.AFTERBEGIN);


    for (let i = 0; i < this.#boardPoints.length; i++) {

      this.#boardDestination = this.#boardDestinations.find((it) => it.id === this.#boardPoints[i].destination);
      this.#chosenOffers = this.#boardOffers.find((it) => it.type === this.#boardPoints[i].type).offers;
      // render(new PointView(this.#boardPoints[i], this.#boardDestination, this.#chosenOffers), this.#boardComponent.element);
      this.#renderPoint(this.#boardPoints[i], this.#boardDestination, this.#chosenOffers);
    }
  };

  #renderPoint = (points, destination, chosenOffers, chosenDestination, destinations, point, avaliableOffers) => {
    const pointComponent = new PointView(points, destination, chosenOffers);
    // const editPointComponent = new EditPointView(chosenDestination, destinations, point, avaliableOffers);
    const editPointComponent = new EditPointView(this.#chosenDestination, this.#boardDestinations, this.#boardPoint, this.#avaliableOffers);


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

}

