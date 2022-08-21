import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import { render } from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import DestinationModel from './model/destination-model.js';
import PointModel from './model/point-model.js';
import OfferModel from './model/offer-model.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');

render(new FilterView(), siteFilterElement);


const siteMainElement = document.querySelector('.page-main');
const siteEventsElement = siteMainElement.querySelector('.trip-events');

render(new SortView(), siteEventsElement);

const boardPresenter = new BoardPresenter();
const destinationModel = new DestinationModel();
const pointModel = new PointModel();
const offerModel = new OfferModel();

boardPresenter.init(siteEventsElement, destinationModel, pointModel, offerModel);
