import {remove, render, RenderPosition} from "./utils/render";
import {MenuItem, UpdateType} from "./const";
import TripsModel from "./model/trips";
import FilterModel from "./model/filter";
import TripPresenter from "./presenter/trip";
import FilterPresenter from "./presenter/filter";
import InfoPresenter from "./presenter/info";
import Menu from "./view/menu";
import Stats from "./view/stats";
import Api from "./api";

const AUTHORIZATION = `Basic ebkjehjklcbn`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;

const tripsModel = new TripsModel();
const filterModel = new FilterModel();
const api = new Api(END_POINT, AUTHORIZATION);

const body = document.querySelector(`.page-body`);
const tripMainView = body.querySelector(`.trip-main`);
const tripControlsView = tripMainView.querySelector(`.trip-controls`);
const menuComponent = new Menu();
let currentMenu = MenuItem.TABLE;
render(tripMainView.querySelector(`.trip-controls`), menuComponent, RenderPosition.BEFOREEND);

menuComponent.setMenuItem(currentMenu);

api.getAllData()
  .then((trips) => {
    tripsModel.setTrips(UpdateType.INIT, trips);
  })
  .catch(() => {
    tripsModel.setTrips(UpdateType.INIT, []);
  });

const infoPresenter = new InfoPresenter(tripMainView, tripsModel);
const tripPresenter = new TripPresenter(body.querySelector(`.trip-events`), tripsModel, filterModel, api);
const filterPresenter = new FilterPresenter(tripControlsView, filterModel, tripsModel);


infoPresenter.init();
filterPresenter.init();
tripPresenter.init();
let statsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  currentMenu = menuItem;
  switch (menuItem) {
    case MenuItem.TABLE:
      remove(statsComponent);
      tripPresenter.init();
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
  if (currentMenu === MenuItem.STATS) {
    menuComponent.setMenuItem(MenuItem.TABLE);
    remove(statsComponent);
    tripPresenter.init();
  }
  tripPresenter.createNewTrip();
});
