import PointView from '../view/point-view';
import EditPointView from '../view/edit-point-view';
import { render, replace, remove } from '../framework/render';

export default class PointPresenter {
  #point;
  #destinations;

  #boardComponent = null;
  #changeData = null;

  #pointComponent = null;
  #editPointComponent = null;

  constructor(boardComponent, changeData) {
    this.#boardComponent = boardComponent;
    this.#changeData = changeData;
  }

  init = (point, destinations) => {
    this.#point = point;
    this.#destinations = destinations;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointView(this.#point);
    this.#editPointComponent = new EditPointView(this.#point, this.#destinations);

    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    this.#pointComponent.setClickHandler(() => {
      this.#replacePointToForm();
      document.addEventListener('keydown', this.#onEscKeyDown);
    });


    this.#editPointComponent.setFormSubmitHandler(() => {
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    });


    this.#editPointComponent.setFormClickHandler(() => {
      this.#replaceFormToPoint();
    });

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#boardComponent);
      return;
    }

    if (this.#boardComponent.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if(this.#boardComponent.contains(prevEditPointComponent.element)) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);

  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  };


  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  };


  #replacePointToForm = () => {
    replace(this.#editPointComponent, this.#pointComponent);
  };


  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#editPointComponent);
  };


  #onEscKeyDown = (evt) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };
}
