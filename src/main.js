import {generateTripItemArray} from "./mock/trip-item";
import {render, RenderPosition} from "./utils/render";
import TripsModel from "./model/trips";
import FilterModel from "./model/filter";
import TripPresenter from "./presenter/trip";
import FilterPresenter from "./presenter/filter";
import TripInfo from "./view/trip-info.js";
import TripInfoCost from "./view/trip-info-cost";
import Menu from "./view/menu";
import {UpdateType} from "./const";

export const TRIP_ITEMS = 30;

const tripsModel = new TripsModel();
const filterModel = new FilterModel();
tripsModel.setTrips(UpdateType.MAJOR, generateTripItemArray(TRIP_ITEMS));

const body = document.querySelector(`.page-body`);
const tripMainView = body.querySelector(`.trip-main`);
const tripInfoView = new TripInfo(tripsModel.getTrips());
render(tripMainView, tripInfoView, RenderPosition.AFTERBEGIN);
render(tripInfoView, new TripInfoCost(tripsModel.getTrips()), RenderPosition.BEFOREEND);
const tripControlsView = tripMainView.querySelector(`.trip-controls`);
render(tripControlsView, new Menu(), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(body.querySelector(`.trip-events`), tripsModel, filterModel);
const filterPresenter = new FilterPresenter(tripControlsView, filterModel, tripsModel);

filterPresenter.init();
tripPresenter.init();
body.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createNewTrip();
});
