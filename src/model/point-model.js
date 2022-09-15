import Observable from '../framework/observable.js';
import { UpdateType } from '../constants.js';

export default class PointModel extends Observable {
  #pointsApiService = null;

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
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
      this.#offers = await this.#pointsApiService.offers;
      this.#destinations = await this.#pointsApiService.destinations;
    } catch(err) {
      this.#points = [];
      this.#offers = [];
      this.#destinations = [];
    }
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


  addPoint = (updateType, update) => {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  };


  deletePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error ('Can\'t delete unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.points.slice(index + 1),
    ];

    this._notify(updateType);
  };


  getDestinationById(pointDestination) {
    const destination = this.#destinations.find((it) => it.id === pointDestination);
    return destination;
  }


  getOffersById(point) {
    const pointOffers = this.#offers.find((it) => it.type === point.type).offers;
    const avaliableOffers = pointOffers.filter((it) => point.offers.includes(it.id));
    return avaliableOffers;
  }


  getAllOffersByPoints(pointsArr) {
    const result = [];
    pointsArr.forEach((it) => result.push(...(this.getOffersById(it))));
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
