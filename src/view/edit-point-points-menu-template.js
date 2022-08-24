import { ucFirst } from '../utils.js';

const createPointsMenuTemplate = (points) => {

  const template = points.reduce((prev, cur) => prev.concat(
    `<div class="event__type-item">
      <input id="event-type-${ cur }-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${ cur }>
      <label class="event__type-label  event__type-label--${ cur }" for="event-type-${ cur }-1">${ ucFirst(cur) }</label>
    </div>`
  ), '');

  return template;

};

export { createPointsMenuTemplate };
