import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import BoardView from '../view/board-view.js';
import NoPointsView from '../view/no-points-view.js';
import SortView from '../view/sort-view.js';
import FilterView from '../view/filter-view.js';
import HeaderInfoView from '../view/header-info-view.js';
import { render, replace, RenderPosition } from '../framework/render.js';

export default class BoardPresenter {
  #infoContainer;
  #headerContainer;
  #boardContainer;
  #pointModel;

  #boardComponent = new BoardView();

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
    const pointComponent = new PointView(point, destination, chosenOffers);
    const editPointComponent = new EditPointView(destination, destinations, point, avaliableOffers);


    const replacePointToForm = () => {
      replace(editPointComponent, pointComponent);
    };


    const replaceFormToPoint = () => {
      replace(pointComponent, editPointComponent);
    };


    const onEscKeyDown = (evt) => {
      if (evt.key === 'Esc' || evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };


    pointComponent.setClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });


    editPointComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });


    editPointComponent.setFormClickHandler(() => {
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
        this.#allChosenOffers = this.#allChosenOffers.concat(this.#chosenOffers); //для подсчёта общей стомости выбранных офферов

        this.#avaliableOffers = this.#boardOffers.find((it) => it.type === this.#boardPoints[i].type).offers;

        this.#renderPoint(this.#boardPoints[i], this.#boardDestination, this.#chosenOffers, this.#boardDestinations, this.#avaliableOffers);

      }
    }
  };

  #renderHeader = (points, destinations, allChosenOffers) => {

    if (this.#boardPoints.length > 0) {
      render(new HeaderInfoView(points, destinations, allChosenOffers), this.#infoContainer, RenderPosition.AFTERBEGIN);
      render(new FilterView(points), this.#headerContainer);
    }

  };
}

