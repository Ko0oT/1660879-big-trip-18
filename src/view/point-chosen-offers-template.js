const createChosenOffersTemplate = (offers) => {

  let template = '';

  for (let i = 0; i < offers.length; i++) {

    template += `
    <li class="event__offer">
      <span class="event__offer-title">${offers[i].title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offers[i].price}</span>
    </li>`;

  }

  return `
  <h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
    ${template}
  </ul>`;

};

export { createChosenOffersTemplate };

