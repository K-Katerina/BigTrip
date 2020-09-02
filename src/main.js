import {generateTripItemArray} from "./mock/trip-item";
import {render, RenderPosition} from "./utils/render";
import TripsModel from "./model/trips";
import TripPresenter from "./presenter/trip";
import TripInfo from "./view/trip-info.js";
import TripInfoCost from "./view/trip-info-cost";
import Menu from "./view/menu";
import Filter from "./view/filter";

export const TRIP_ITEMS = 3;

const tripsModel = new TripsModel();
tripsModel.setTrips(0, generateTripItemArray(TRIP_ITEMS));

const body = document.querySelector(`.page-body`);
const tripMainView = body.querySelector(`.trip-main`);
const tripInfoView = new TripInfo(tripsModel.getTrips());
render(tripMainView, tripInfoView, RenderPosition.AFTERBEGIN);
render(tripInfoView, new TripInfoCost(tripsModel.getTrips()), RenderPosition.BEFOREEND);
const tripControlsView = tripMainView.querySelector(`.trip-controls`);
render(tripControlsView, new Menu(), RenderPosition.BEFOREEND);
render(tripControlsView, new Filter(), RenderPosition.BEFOREEND);

const trip = new TripPresenter(body.querySelector(`.trip-events`), tripsModel);
trip.init();
body.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  trip.createNewTrip();
});
