import BoardView from '../view/board-view.js';
import NoPointsView from '../view/no-points-view.js';
import SortView from '../view/sort-view.js';
import FilterView from '../view/filter-view.js';
import HeaderInfoView from '../view/header-info-view.js';
import PointPresenter from './point-presenter.js';
import { render, RenderPosition } from '../framework/render.js';
import { updateItem } from '../utils.js';

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

  #pointPresenter = new Map();

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
    this.#renderHeader(this.#boardPoints, this.#boardDestinations, this.#boardOffers);
  };

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint, this.#boardDestinations);
  };

  #renderPoint = (point, destinations) => {

    const pointPresenter = new PointPresenter(this.#boardComponent.element, this.#handlePointChange);
    pointPresenter.init(point, destinations);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #clearPoints = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #renderPoints = () => {

    for (let i = 0; i < this.#boardPoints.length; i++) {

      const destination = this.#boardDestinations.find((it) => it.id === this.#boardPoints[i].destination);
      const filterOffers = () => {
        const pointOffers = this.#boardOffers.find((offer) => offer.type === this.#boardPoints[i].type);
        const offersToAd = pointOffers.offers.filter((offer) => this.#boardPoints[i].offers.includes(offer.id));
        return {
          type: pointOffers.type,
          offers: offersToAd,
        };
      };

      this.#boardPoints[i].destination = destination;
      this.#boardPoints[i].offers = filterOffers();


      this.#renderPoint(this.#boardPoints[i], this.#boardDestinations);

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


  #renderHeader = (points, destinations, offers) => {

    if (this.#boardPoints.length > 0) {
      render(new HeaderInfoView(points, destinations, offers), this.#infoContainer, RenderPosition.AFTERBEGIN);
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
