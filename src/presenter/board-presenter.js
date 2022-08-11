import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import BoardView from '../view/board-view.js';
import { render, RenderPosition } from '../render.js';

export default class BoardPresenter {
  boardComponent = new BoardView();

  init = (boardContainer) => {
    this.boardContainer = boardContainer;

    render(this.boardComponent, this.boardContainer); //что отрис //где отрисовывем
    render(new AddNewPointView(), this.boardComponent.getElement());
    render(new EditPointView(), this.boardComponent.getElement(), RenderPosition.AFTERBEGIN);
    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.boardComponent.getElement());
    }
  };
}
