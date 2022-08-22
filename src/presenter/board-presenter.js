// import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import BoardView from '../view/board-view.js';
import { render, RenderPosition } from '../render.js';

export default class BoardPresenter {
  boardComponent = new BoardView();

  init = (boardContainer, destinationModel, pointModel, offerModel) => {
    this.boardContainer = boardContainer;

    this.destinationModel = destinationModel;
    this.boardDestinations = [...this.destinationModel.get()];
    this.chosenDestination = this.boardDestinations[0];

    this.pointModel = pointModel;
    this.boardPoints = [...this.pointModel.get()];

    this.offerModel = offerModel;
    this.boardOffers = [...this.offerModel.get()];


    render(this.boardComponent, this.boardContainer);


    this.boardPoint = this.boardPoints.find((it) => it.id === this.chosenDestination.id);
    this.avaliableOffers = this.boardOffers.find((it) => it.type === this.boardPoint.type).offers;

    render(new EditPointView(this.chosenDestination, this.boardDestinations, this.boardPoint, this.avaliableOffers), this.boardComponent.getElement(), RenderPosition.AFTERBEGIN);


    for (let i = 0; i < this.boardPoints.length; i++) {

      this.boardDestination = this.boardDestinations.find((it) => it.id === this.boardPoints[i].destination);
      this.chosenOffers = this.boardOffers.find((it) => it.type === this.boardPoints[i].type).offers;

      render(new PointView(this.boardPoints[i], this.boardDestination, this.chosenOffers), this.boardComponent.getElement());
    }
  };
}

