import { createElement } from '../render.js';

const createFilterTemplate = () => '<ul class="trip-events__list"></ul>';

export default class BoardView {
  #element;

  get template() {
    return createFilterTemplate();
  }


  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
