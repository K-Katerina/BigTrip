import AbstractView from "./abstract-view";

const createNoItemsTemplate = () => {
  return (`
    <p class="trip-events__msg">Click New Event to create your first point</p>
  `);
};

export default class NoItems extends AbstractView {
  getTemplate() {
    return createNoItemsTemplate();
  }
}
