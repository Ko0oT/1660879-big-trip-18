import BoardView from '../view/board-view.js';
import NoPointsView from '../view/no-points-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import HeaderPresenter from './header-presenter.js';
import { remove, render } from '../framework/render.js';
import { sortPointsByDay, sortPointsByPrice, sortPointsByTime } from '../utils.js';
import { SortType, UpdateType, UserAction } from '../mock/constants.js';

export default class BoardPresenter {
  #infoContainer;
  #headerContainer;
  #boardContainer;
  #pointModel;
  #headerPresenter;

  #boardComponent = new BoardView();
  #noPointComponent = null;
  #sortComponent = null;

  #pointPresenter = new Map();
  #currentSortType = SortType.DEFAULT;


  constructor(infoContainer, headerContainer, boardContainer, pointModel) {
    this.#infoContainer = infoContainer;
    this.#headerContainer = headerContainer;
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
    this.#pointModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.PRICE:
        return [...this.#pointModel.points].sort(sortPointsByPrice);
      case SortType.TIME:
        return [...this.#pointModel.points].sort(sortPointsByTime);
    }
    return [...this.#pointModel.points].sort(sortPointsByDay);
  }

  init = () => {
    this.#renderBoard();
    this.#renderHeader();
  };

  #handleMockChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };


  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, update);
        break;
    }
  };


  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        this.#headerPresenter.init(this.#pointModel.points);
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        this.#headerPresenter.init(this.#pointModel.points);
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  };


  #renderPoint = (point) => {

    const pointPresenter = new PointPresenter(this.#pointModel, this.#boardComponent.element, this.#handleViewAction, this.#handleMockChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = (points) => {

    points.forEach((point) => this.#renderPoint(point));

  };

  #clearBoard = ({resetSortType = false} = {}) => {

    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#noPointComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }

  };

  #renderBoard = () => {
    const points = this.points;
    const pointsCount = points.length;

    if (pointsCount === 0) {

      this.#renderNoPoints();
      return;

    }

    render(this.#boardComponent, this.#boardContainer);
    this.#renderSort();
    this.#renderPoints(points);

  };


  #renderHeader = () => {

    if (this.points.length > 0) {
      this.#headerPresenter = new HeaderPresenter(this.#pointModel, this.#infoContainer, this.#headerContainer);
      this.#headerPresenter.init(this.points);
    }
  };


  #renderNoPoints = () => {
    this.#noPointComponent = new NoPointsView();
    render(this.#noPointComponent, this.#boardContainer);
  };


  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };


  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#boardComponent.element);
  };
}
