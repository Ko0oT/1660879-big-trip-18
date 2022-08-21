const createAvaliableOffersTemplate = (offers) => {

  let template = '';

  for (let i = 0; i < offers.length; i++) {

    template += `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${ i }" type="checkbox" name="event-offer-${ i }" checked>
        <label class="event__offer-label" for="event-offer-${ i }">
        <span class="event__offer-title">${ offers[i].title }</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${ offers[i].price }</span>
      </label>
    </div>`;

  }

  return `
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
      ${ template }
    </div>
  </section>`;

};

export { createAvaliableOffersTemplate };

