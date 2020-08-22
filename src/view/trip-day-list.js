import AbstractView from "./abstract-view";

const createTripDayListTemplate = () => {
  return (`
    <ul class="trip-days">
    </ul>
  `);
};

export default class TripDayList extends AbstractView {
  getTemplate() {
    return createTripDayListTemplate();
  }
}
