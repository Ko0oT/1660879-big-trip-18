import EditPointView from '../view/edit-point-view';
import { render, remove, RenderPosition } from '../framework/render';
import { UserAction, UpdateType } from '../constants';


export default class NewPointPresenter {
  #pointModel;
  #boardComponent = null;
  #changeData = null;

  #editPointComponent = null;
  #destroyCallback = null;


  constructor(boardComponent, changeData, pointModel) {
    this.#pointModel = pointModel;
    this.#boardComponent = boardComponent;
    this.#changeData = changeData;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#editPointComponent !== null) {
      return;
    }

    this.#editPointComponent = new EditPointView(this.#pointModel);


    this.#editPointComponent.setFormSubmitHandler((point) => {
      this.#changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        point,
      );
    });

    this.#editPointComponent.setFormArrowClickHandler(() => {
      this.destroy();
    });

    this.#editPointComponent.setFormDeleteClickHandler(() => {
      this.destroy();
    });


    render(this.#editPointComponent, this.#boardComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#onEscKeyDownHandler);
  };

  destroy = () => {

    if (this.#editPointComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#editPointComponent);
    this.#editPointComponent = null;

    document.removeEventListener('keydown', this.#onEscKeyDownHandler);
  };

  setSaving = () => {
    this.#editPointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#editPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editPointComponent.shake(resetFormState);
  };

  #onEscKeyDownHandler = (evt) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
