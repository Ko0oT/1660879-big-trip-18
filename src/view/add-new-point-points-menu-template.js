import { ucFirst } from '../utils.js';

const createPointsMenuTemplate = (points) => {
  let template = '';
  for (let i = 0; i < points.length; i++) {
    template += `<div class="event__type-item">
    <input id="event-type-${ points[i] }-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${ points[i] }>
    <label class="event__type-label  event__type-label--${ points[i] }" for="event-type-${ points[i] }-1">${ ucFirst(points[i]) }</label>
  </div>`;
  }
  return template;
};

export { createPointsMenuTemplate };
