const createAvaliableOffersTemplate = (offersByType, checkedOffers) => {

  const isChecked = (offer) => checkedOffers.includes(offer.id);

  const allOffersTemplate = offersByType
    .map((offer) => (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox visually-hidden" id="event-offer-${ offer.id }" type="checkbox" name="event-offer-${ offer.id }" ${ isChecked(offer) ? 'checked' : '' }>
          <label class="event__offer-label" for="event-offer-${ offer.id }">
          <span class="event__offer-title">${ offer.title }</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${ offer.price }</span>
        </label>
      </div>`
    ))
    .join('');

  return `
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
      ${ allOffersTemplate }
    </div>
  </section>`;

};

export { createAvaliableOffersTemplate };

