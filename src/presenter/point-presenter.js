import PointView from '../view/point-view';
import EditPointView from '../view/edit-point-view';
import { render, replace, remove } from '../framework/render';
import { UserAction, UpdateType } from '../constants';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #point;

  #pointModel;
  #boardComponent = null;
  #changeData = null;
  #changeMode = null;

  #pointComponent = null;
  #editPointComponent = null;

  #mode = Mode.DEFAULT;

  constructor(pointModel, boardComponent, changeData, changeMode) {
    this.#pointModel = pointModel;
    this.#boardComponent = boardComponent;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point) => {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointView(this.#pointModel, this.#point);
    this.#editPointComponent = new EditPointView(this.#pointModel, this.#point);


    this.#pointComponent.setFavoriteClickHandler(() => {
      this.#changeData(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        {...this.#point, isFavorite: !this.#point.isFavorite});
    });

    this.#pointComponent.setArrowClickHandler(() => {
      this.#replacePointToForm();
    });

    this.#editPointComponent.setFormSubmitHandler((task) => {
      this.#changeData(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        task);
    });

    this.#editPointComponent.setFormArrowClickHandler(() => {
      this.#replaceFormToPoint();
    });

    this.#editPointComponent.setFormDeleteClickHandler(() => {
      this.#changeData(
        UserAction.DELETE_POINT,
        UpdateType.MINOR,
        point,
      );
    });


    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#boardComponent);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointComponent, prevEditPointComponent);
      this.#mode = Mode.DEFAULT;
    }


    remove(prevPointComponent);
    remove(prevEditPointComponent);

  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  };

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };

  setAborting = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#editPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editPointComponent.shake(resetFormState);
  };

  #replacePointToForm = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };


  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
  };


  #onEscKeyDown = (evt) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };
}
