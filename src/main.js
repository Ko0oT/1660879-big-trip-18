import FilterView from './view/filter-view.js';
import { render } from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointModel from './model/point-model.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');

render(new FilterView(), siteFilterElement);

const siteMainElement = document.querySelector('.page-main');
const siteEventsElement = siteMainElement.querySelector('.trip-events');

const pointModel = new PointModel();
const boardPresenter = new BoardPresenter(siteEventsElement, pointModel);

boardPresenter.init();
