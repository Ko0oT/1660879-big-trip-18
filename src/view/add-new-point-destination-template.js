const createDestinationTemplate = (description, pictures) => {

  let template = '';

  for (let i = 0; i < pictures.length; i++) {
    template += `<img class="event__photo" src=${ pictures[i].src }>`;
  }

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


