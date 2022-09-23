import HeaderInfoView from '../view/header-info-view.js';
import { render, remove, RenderPosition } from '../framework/render';
import { sortPointsByDay } from '../utils.js';

export default class HeaderPresenter {
  #boardPoints;
  #pointModel;
  #infoContainer;

  #headerInfoComponent = null;

  constructor(pointModel, infoContainer) {
    this.#pointModel = pointModel;
    this.#infoContainer = infoContainer;
  }

  init = () => {

    if(this.#headerInfoComponent !== null) {
      return;
    }

    this.#boardPoints = this.#pointModel.points.sort(sortPointsByDay);

    this.#headerInfoComponent = new HeaderInfoView(this.#boardPoints, this.#pointModel);

    render(this.#headerInfoComponent, this.#infoContainer, RenderPosition.AFTERBEGIN);

  };

  destroy = () => {
    if(this.#headerInfoComponent === null) {
      return;
    }

    remove(this.#headerInfoComponent);
    this.#headerInfoComponent = null;
  };

}
