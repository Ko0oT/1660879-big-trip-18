import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';


const createHeaderInfoTemplate = (points, destinations, chosenOffers) => {

  const getDates = (pointsArr) => {
    const dateA = pointsArr[0].dateFrom;
    const dateB = pointsArr[pointsArr.length - 1].dateTo;

    if (dayjs(dateA).isSame(dayjs(dateB), 'day')) {
      return `${dayjs(dateA).format('MMM D')}`;
    }

    if (dayjs(dateA).isSame(dayjs(dateB), 'month')) {
      return `${dayjs(dateA).format('MMM D')} &mdash; ${dayjs(dateB).format('D')}`;
    }

    return `${dayjs(dateA).format('MMM D')} &mdash; ${dayjs(dateB).format('MMM D')}`;
  };


  const getCityNames = (pointsArr, destArr) => {
    const result = [];
    let repeat = null;
    pointsArr.forEach((el)=>{
      if(el.id !== repeat){
        result.push(el.id);
        repeat = el.id;
      }
    });

    if (result.length === 1) {
      const cityA = destArr.find((it) => it.id === result[0]);
      return cityA.name;
    }

    if (result.length === 2) {
      const cityA = destArr.find((it) => it.id === result[0]);
      const cityB = destArr.find((it) => it.id === result[1]);
      return `${cityA.name} &mdash; ${cityB.name}`;
    }

    if (result.length === 3) {
      const cityA = destArr.find((it) => it.id === result[0]);
      const cityB = destArr.find((it) => it.id === result[1]);
      const cityC = destArr.find((it) => it.id === result[2]);
      return `${cityA.name} &mdash; ${cityB.name} &mdash; ${cityC.name}`;
    }

    if (result.length > 3) {
      const cityA = destArr.find((it) => it.id === result[0]);
      const cityZ = destArr.find((it) => it.id === result[result.length - 1]);
      return `${cityA.name} &mdash; ... &mdash; ${cityZ.name}`;
    }
  };


  const getTotalPrice = (pointsArr, offersArr) => {
    const baseTotalPrice = pointsArr.reduce((prev, cur) => prev + cur.basePrice, 0);
    const offersTotalPrice = offersArr.reduce((prev, cur) => prev + cur.price, 0);
    return baseTotalPrice + offersTotalPrice;
  };


  return (
    `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${ getCityNames(points, destinations) }</h1>

      <p class="trip-info__dates">${ getDates(points) }</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${ getTotalPrice(points, chosenOffers) }</span>
    </p>
  </section>`
  );
};

export default class HeaderInfoView extends AbstractView {
  #points;
  #destinations;
  #allChosenOffers;

  constructor(points, destinations, allChosenOffers) {
    super();
    this.#points = points;
    this.#destinations = destinations;
    this.#allChosenOffers = allChosenOffers;
  }

  get template() {
    return createHeaderInfoTemplate(this.#points, this.#destinations, this.#allChosenOffers);
  }
}
