import BoardPresenter from './presenter/board-presenter.js';
import PointModel from './model/point-model.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteInfoElement = siteHeaderElement.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');
const siteEventsElement = siteMainElement.querySelector('.trip-events');

const pointModel = new PointModel();
const boardPresenter = new BoardPresenter(siteInfoElement, siteFilterElement, siteEventsElement, pointModel);

boardPresenter.init();
