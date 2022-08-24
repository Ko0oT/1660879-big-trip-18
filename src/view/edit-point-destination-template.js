const createDestinationTemplate = (description, pictures) => {

  const template = pictures.reduce((prev, cur) => prev.concat(`<img class="event__photo" src=${ cur.src }>`), '');

  return `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${ description }</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${ pictures[0] ? template : '' }
      </div>
    </div>
  </section>`;

};

export { createDestinationTemplate };

