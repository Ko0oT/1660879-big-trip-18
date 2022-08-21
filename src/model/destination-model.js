import { generateDestination } from '../mock/destination.js';

export default class DestinationModel {
  destinations = Array.from({length: 7}, generateDestination);

  get = () => this.destinations;
}
