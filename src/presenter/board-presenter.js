import BoardView from '../view/board-view.js';
import NoPointsView from '../view/no-points-view.js';
import SortView from '../view/sort-view.js';
import LoadingView from '../view/loading-view.js';
import PointPresenter from './point-presenter.js';
import HeaderPresenter from './header-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import { remove, render } from '../framework/render.js';
import { sortPointsByDay, sortPointsByPrice, sortPointsByTime } from '../utils.js';
import { SortType, UpdateType, UserAction, FilterType } from '../constants.js';
import { filter } from '../filter.js';

export default class BoardPresenter {
  #infoContainer;
  #boardContainer;
  #pointModel;
  #filterModel;
  #headerPresenter;
  #newPointPresenter;
  #filterType = FilterType.EVERYTHING;

  #boardComponent = new BoardView();
  #loadingComponent = new LoadingView();
  #noPointComponent = null;
  #sortComponent = null;

  #pointPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #isLoading = true;


  constructor(infoContainer, boardContainer, pointModel, filterModel) {
    this.#infoContainer = infoContainer;
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter(this.#boardComponent.element, this.#handleViewAction, this.#pointModel);

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredPoints = filter[this.#filterType](points);
    switch (this.#currentSortType) {
      case SortType.PRICE:
        return filteredPoints.sort(sortPointsByPrice);
      case SortType.TIME:
        return filteredPoints.sort(sortPointsByTime);
    }
    return filteredPoints.sort(sortPointsByDay);
  }

  init = () => {
    this.#renderBoard();
    this.#renderHeader();
  };

  createPoint = (callback) => {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(callback);
  };


  #handleMockChange = () => {
    this.#newPointPresenter.destroy();
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };


  #renderPoint = (point) => {

    const pointPresenter = new PointPresenter(this.#pointModel, this.#boardComponent.element, this.#handleViewAction, this.#handleMockChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = (points) => {

    points.forEach(this.#renderPoint);

  };

  #clearBoard = ({resetSortType = false} = {}) => {

    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }

  };

  #renderBoard = () => {
    render(this.#boardComponent, this.#boardContainer);

    if (this.#isLoading) {

      this.#renderLoading();
      return;

    }

    const points = this.points;
    const pointsCount = points.length;

    if (pointsCount === 0) {

      this.#renderNoPoints();
      return;

    }


    this.#renderSort();
    this.#renderPoints(points);

  };


  #renderHeader = () => {

    if (this.points.length > 0) {
      this.#headerPresenter = new HeaderPresenter(this.#pointModel, this.#infoContainer);
      this.#headerPresenter.init(this.points);
    }
  };


  #renderLoading = () => {
    render(this.#loadingComponent, this.#boardContainer);

  };

  #renderNoPoints = () => {
    this.#noPointComponent = new NoPointsView(this.#filterType);
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
