import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic dfvrv52334tvdvd';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';


const siteHeaderElement = document.querySelector('.page-header');
const siteFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteInfoElement = siteHeaderElement.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');
const siteEventsElement = siteMainElement.querySelector('.trip-events');
const newPointButton = document.querySelector('.trip-main__event-add-btn');

const pointModel = new PointModel(new PointsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter(siteInfoElement, siteEventsElement, pointModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, pointModel);

const handleNewPointFormClose = () => {
  newPointButton.disabled = false;
};

const handleNewPointButtonClick = () => {
  boardPresenter.createPoint(handleNewPointFormClose);
  newPointButton.disabled = true;
};

newPointButton.addEventListener('click', handleNewPointButtonClick);

boardPresenter.init();
filterPresenter.init();
pointModel.init();
