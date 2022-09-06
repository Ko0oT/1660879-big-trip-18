import BoardView from '../view/board-view.js';
import NoPointsView from '../view/no-points-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import HeaderPresenter from './header-presenter.js';
import { render } from '../framework/render.js';
import { updateItem, sortPointsByDay, sortPointsByPrice, sortPointsByTime } from '../utils.js';
import { SortType } from '../mock/constants.js';

export default class BoardPresenter {
  #infoContainer;
  #headerContainer;
  #boardContainer;
  #pointModel;
  #headerPresenter;

  #boardComponent = new BoardView();
  #noPointComponent = new NoPointsView();
  #sortComponent = new SortView();

  #boardPoints;
  #boardDestinations;
  #boardOffers;

  #pointPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedBoardPoints = [];

  constructor(infoContainer, headerContainer, boardContainer, pointModel) {
    this.#infoContainer = infoContainer;
    this.#headerContainer = headerContainer;
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
  }


  init = () => {

    this.#boardPoints = [...this.#pointModel.points].sort(sortPointsByDay);
    this.#sourcedBoardPoints = [...this.#pointModel.points].sort(sortPointsByDay);
    this.#boardDestinations = [...this.#pointModel.destinations];
    this.#boardOffers = [...this.#pointModel.offers];

    this.#renderBoard();
    this.#renderHeader();
  };

  #handleMockChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
    this.#headerPresenter.init(this.#boardPoints);
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.PRICE:
        this.#boardPoints.sort(sortPointsByPrice);
        break;
      case SortType.TIME:
        this.#boardPoints.sort(sortPointsByTime);
        break;
      default:
        this.#boardPoints = [...this.#sourcedBoardPoints];
    }
    this.#currentSortType = sortType;
  };


  #renderPoint = (point) => {

    const pointPresenter = new PointPresenter(this.#pointModel, this.#boardComponent.element, this.#handlePointChange, this.#handleMockChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #clearPoints = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #renderPoints = () => {

    this.#boardPoints.forEach((it) => this.#renderPoint(it));

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


  #renderHeader = () => {

    if (this.#boardPoints.length > 0) {
      this.#headerPresenter = new HeaderPresenter(this.#pointModel, this.#infoContainer, this.#headerContainer);
      this.#headerPresenter.init(this.#boardPoints);
    }
  };


  #renderNoPoints = () => {
    render(this.#noPointComponent, this.#boardContainer);
  };


  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPoints();
    this.#renderPoints();
  };


  #renderSort = () => {
    render(this.#sortComponent, this.#boardComponent.element);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };
}
