import FilterView from '../view/filter-view.js';
import HeaderInfoView from '../view/header-info-view.js';
import { render, RenderPosition } from '../framework/render';

export default class HeaderPresenter {
  #boardPoints;
  #pointModel;
  #infoContainer;
  #headerContainer;

  #headerInfoComponent;
  #filterComponent;

  constructor(boardPoints, pointModel, infoContainer, headerContainer) {
    this.#boardPoints = boardPoints;
    this.#pointModel = pointModel;
    this.#infoContainer = infoContainer;
    this.#headerContainer = headerContainer;
  }

  init = () => {

    this.#headerInfoComponent = new HeaderInfoView(this.#boardPoints, this.#pointModel);
    this.#filterComponent = new FilterView(this.#pointModel);

    render(this.#headerInfoComponent, this.#infoContainer, RenderPosition.AFTERBEGIN);
    render(this.#filterComponent, this.#headerContainer);

  };

}
