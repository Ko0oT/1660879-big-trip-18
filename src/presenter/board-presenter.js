import BoardView from '../view/board-view.js';
import NoPointsView from '../view/no-points-view.js';
import SortView from '../view/sort-view.js';
import FilterView from '../view/filter-view.js';
import HeaderInfoView from '../view/header-info-view.js';
import PointPresenter from './point-presenter.js';
import { render, RenderPosition } from '../framework/render.js';

export default class BoardPresenter {
  #infoContainer;
  #headerContainer;
  #boardContainer;
  #pointModel;

  #boardComponent = new BoardView();
  #noPointComponent = new NoPointsView();
  #sortComponent = new SortView();

  #boardPoints;
  #boardDestinations;
  #boardOffers;
  #chosenOffers;
  #avaliableOffers;
  #boardDestination;
  #allChosenOffers = [];

  constructor(infoContainer, headerContainer, boardContainer, pointModel) {
    this.#infoContainer = infoContainer;
    this.#headerContainer = headerContainer;
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
  }


  init = () => {

    this.#boardPoints = [...this.#pointModel.points];
    this.#boardDestinations = [...this.#pointModel.destinations];
    this.#boardOffers = [...this.#pointModel.offers];

    this.#renderBoard();
    this.#renderHeader(this.#boardPoints, this.#boardDestinations, this.#allChosenOffers);
  };


  #renderPoint = (point, destination, chosenOffers, destinations, avaliableOffers) => {
    const pointPresenter = new PointPresenter(this.#boardComponent.element);
    pointPresenter.init(point, destination, chosenOffers, destinations, avaliableOffers);
  };

  #renderPoints = () => {

    for (let i = 0; i < this.#boardPoints.length; i++) {

      this.#boardDestination = this.#boardDestinations.find((it) => it.id === this.#boardPoints[i].destination);
      this.#chosenOffers = this.#boardOffers.find((it) => it.type === this.#boardPoints[i].type).offers; //надо доработать, чтобы отрисовывались только выбранные, сделаю позже
      this.#allChosenOffers = this.#allChosenOffers.concat(this.#chosenOffers); //для подсчёта общей стомости выбранных офферов

      this.#avaliableOffers = this.#boardOffers.find((it) => it.type === this.#boardPoints[i].type).offers;

      this.#renderPoint(this.#boardPoints[i], this.#boardDestination, this.#chosenOffers, this.#boardDestinations, this.#avaliableOffers);

    }
  };

  #renderBoard = () => {
    if (this.#boardPoints.length === 0) {

      this.#renderNoPoints();

    } else {

      render(this.#boardComponent, this.#boardContainer);
      this.#renderSort();
      this.#renderPoints();
    }
  };

  #renderHeader = (points, destinations, allChosenOffers) => {

    if (this.#boardPoints.length > 0) {
      render(new HeaderInfoView(points, destinations, allChosenOffers), this.#infoContainer, RenderPosition.AFTERBEGIN);
      render(new FilterView(points), this.#headerContainer);
    }

  };

  #renderNoPoints = () => {
    render(this.#noPointComponent, this.#boardContainer);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#boardComponent.element);
  };
}
