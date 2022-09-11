import FilterView from '../view/filter-view.js';
import HeaderInfoView from '../view/header-info-view.js';
import { render, remove, RenderPosition } from '../framework/render';
import { sortPointsByDay } from '../utils.js';

export default class HeaderPresenter {
  #boardPoints;
  #pointModel;
  #infoContainer;
  #headerContainer;

  #headerInfoComponent = null;
  #filterComponent = null;

  constructor(pointModel, infoContainer, headerContainer) {
    this.#pointModel = pointModel;
    this.#infoContainer = infoContainer;
    this.#headerContainer = headerContainer;
  }

  init = (boardPoints) => {

    this.#boardPoints = boardPoints.sort(sortPointsByDay);

    if(this.#headerInfoComponent === null) {
      this.#headerInfoComponent = new HeaderInfoView(this.#boardPoints, this.#pointModel);
      this.#filterComponent = new FilterView(this.#boardPoints);

      render(this.#headerInfoComponent, this.#infoContainer, RenderPosition.AFTERBEGIN);
      render(this.#filterComponent, this.#headerContainer);
    } else {

      remove(this.#headerInfoComponent);
      remove(this.#filterComponent);

      this.#filterComponent = new FilterView(this.#boardPoints);
      render(this.#filterComponent, this.#headerContainer);

      if (this.#boardPoints[0] === undefined) {
        return;
      }
      this.#headerInfoComponent = new HeaderInfoView(this.#boardPoints, this.#pointModel);
      render(this.#headerInfoComponent, this.#infoContainer, RenderPosition.AFTERBEGIN);

    }
  };

}
