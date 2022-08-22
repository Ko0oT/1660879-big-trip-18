const createAvaliableOffersTemplate = (offers) => {

  const template = offers.reduce((prev, cur, index) => prev.concat(`
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${ index }" type="checkbox" name="event-offer-${ index }" checked>
      <label class="event__offer-label" for="event-offer-${ index }">
      <span class="event__offer-title">${ cur.title }</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${ cur.price }</span>
    </label>
  </div>`
  ), '');

  return `
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
      ${ template }
    </div>
  </section>`;

};

export { createAvaliableOffersTemplate };

