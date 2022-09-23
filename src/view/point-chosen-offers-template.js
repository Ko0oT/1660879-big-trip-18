const createCheckedOffersTemplate = (offers) => {

  const template = offers.reduce((prev, cur) => prev.concat(
    `<li class="event__offer">
      <span class="event__offer-title">${ cur.title }</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${ cur.price }</span>
    </li>`
  ), '');

  return `
  <h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
    ${ template }
  </ul>`;

};

export { createCheckedOffersTemplate };

