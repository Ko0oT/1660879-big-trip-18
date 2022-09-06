import FilterView from '../view/filter-view.js';
import HeaderInfoView from '../view/header-info-view.js';
import { render, remove, RenderPosition } from '../framework/render';

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

    this.#boardPoints = boardPoints;

    if(this.#headerInfoComponent === null) {
      this.#headerInfoComponent = new HeaderInfoView(this.#boardPoints, this.#pointModel);
      this.#filterComponent = new FilterView(this.#boardPoints);

      render(this.#headerInfoComponent, this.#infoContainer, RenderPosition.AFTERBEGIN);
      render(this.#filterComponent, this.#headerContainer);
    } else {

      remove(this.#headerInfoComponent);
      remove(this.#filterComponent);
      this.#headerInfoComponent = new HeaderInfoView(this.#boardPoints, this.#pointModel);
      this.#filterComponent = new FilterView(this.#boardPoints);
      render(this.#headerInfoComponent, this.#infoContainer, RenderPosition.AFTERBEGIN);
      render(this.#filterComponent, this.#headerContainer);

    }
  };

}
