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

  init = (boardPoints) => {

    this.#boardPoints = boardPoints.sort(sortPointsByDay);

    if(this.#headerInfoComponent === null) {
      this.#headerInfoComponent = new HeaderInfoView(this.#boardPoints, this.#pointModel);

      render(this.#headerInfoComponent, this.#infoContainer, RenderPosition.AFTERBEGIN);

    } else {

      remove(this.#headerInfoComponent);

      if (this.#boardPoints[0] === undefined) {
        return;
      }
      this.#headerInfoComponent = new HeaderInfoView(this.#boardPoints, this.#pointModel);
      render(this.#headerInfoComponent, this.#infoContainer, RenderPosition.AFTERBEGIN);

    }
  };

}
