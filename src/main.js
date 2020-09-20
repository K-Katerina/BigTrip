import {remove, render, RenderPosition} from "./utils/render";
import {MenuItem, UpdateType} from "./const";
import TripsModel from "./model/trips";
import FilterModel from "./model/filter";
import TripPresenter from "./presenter/trip";
import FilterPresenter from "./presenter/filter";
import TripInfo from "./view/trip-info.js";
import TripInfoCost from "./view/trip-info-cost";
import Menu from "./view/menu";
import Stats from "./view/stats";
import Api from "./api";

const AUTHORIZATION = `Basic mjegduhebjebkjecbn`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;

const tripsModel = new TripsModel();
const filterModel = new FilterModel();
const api = new Api(END_POINT, AUTHORIZATION);

const body = document.querySelector(`.page-body`);
const tripMainView = body.querySelector(`.trip-main`);
const tripControlsView = tripMainView.querySelector(`.trip-controls`);
const menuComponent = new Menu();
render(tripControlsView, menuComponent, RenderPosition.BEFOREEND);
menuComponent.setMenuItem(MenuItem.TABLE);

api.getAllData()
  .then((trips) => {
    tripsModel.setTrips(UpdateType.INIT, trips);
    const tripInfoView = new TripInfo(tripsModel.getTrips());
    render(tripMainView, tripInfoView, RenderPosition.AFTERBEGIN);
    render(tripInfoView, new TripInfoCost(tripsModel.getTrips()), RenderPosition.BEFOREEND);
  })
  .catch(() => {
    tripsModel.setTrips(UpdateType.INIT, []);
  });

const tripPresenter = new TripPresenter(body.querySelector(`.trip-events`), tripsModel, filterModel, api);
const filterPresenter = new FilterPresenter(tripControlsView, filterModel, tripsModel);

filterPresenter.init();
tripPresenter.init();
let statsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      tripPresenter.init();
      remove(statsComponent);
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();
      statsComponent = new Stats(tripsModel);
      render(body.querySelector(`.main-content`), statsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

menuComponent.setMenuClickHandler(handleSiteMenuClick);

body.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createNewTrip();
});
