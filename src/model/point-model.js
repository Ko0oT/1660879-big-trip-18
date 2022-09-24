import Observable from '../framework/observable.js';
import { UpdateType, TimeLimit } from '../constants.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
export default class PointModel extends Observable {
  #pointsApiService = null;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT,TimeLimit.UPPER_LIMIT);

  constructor(pointsApiService) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  #points = [];
  #offers = [];
  #destinations = [];


  get points () {
    return this.#points;
  }


  get offers () {
    return this.#offers;
  }


  get destinations () {
    return this.#destinations;
  }

  init = async () => {
    try {
      this.#uiBlocker.block();
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
      this.#offers = await this.#pointsApiService.offers;
      this.#destinations = await this.#pointsApiService.destinations;
    } catch(err) {
      throw new Error ('Server not responding');
    }
    this.#uiBlocker.unblock();
    this._notify(UpdateType.INIT);
  };


  updatePoint = async (updateType, update) => {
    const index = this.#points.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error ('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType, updatedPoint);

    } catch(err) {

      throw new Error ('Can\'t update point');
    }
  };


  addPoint = async (updateType, update) => {
    try {
      const response = await this.#pointsApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);

      this.#points = [
        newPoint,
        ...this.#points,
      ];
      this._notify(updateType, newPoint);

    } catch (err) {
      throw new Error('Can\'t add point');
    }
  };


  deletePoint = async (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error ('Can\'t delete unexisting point');
    }

    try {
      await this.#pointsApiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.points.slice(index + 1),
      ];
      this._notify(updateType);

    } catch(err) {
      throw new Error ('Can\'t delete point');
    }
  };


  getDestinationById(pointDestination) {
    const destination = this.#destinations.find((it) => it.id === pointDestination);
    return destination;
  }


  getСheckedOffers(point) {
    const offersByType = this.#offers.find((it) => it.type === point.type).offers;
    const checkedOffers = offersByType.filter((it) => point.offers.includes(it.id));
    return checkedOffers;
  }


  getAllOffersByType(point) {
    const offersByType = this.#offers.find((it) => it.type === point.type).offers;
    return offersByType;
  }


  getAllOffersByPoints(pointsArr) {
    const result = [];
    pointsArr.forEach((it) => result.push(...(this.getСheckedOffers(it))));
    return result;
  }


  getIdByDestination(destinationName) {
    const {id} = this.#destinations.find((it) => it.name === destinationName);
    return id;
  }

  #adaptToClient = (point) => {
    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite']
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  };

}
