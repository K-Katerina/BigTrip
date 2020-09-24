import AbstractView from "./abstract-view";

const createNoTripTemplate = () => {
  return `<p class="trip-events__msg">
    Loading...
  </p>`;
};

export default class Loading extends AbstractView {
  getTemplate() {
    return createNoTripTemplate();
  }
}
