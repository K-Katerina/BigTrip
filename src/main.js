import {generateTripItemArray} from "./mock/trip-item";
import {render, RenderPosition} from "./utils/render";
import {groupTripEventsByBeginningOfDay} from "./utils/common";
import TripInfo from "./view/trip-info.js";
import TripInfoCost from "./view/trip-info-cost";
import Menu from "./view/menu";
import Filter from "./view/filter";
import Trip from "./presenter/trip";

export const TRIP_ITEMS = 10;

const tripItemArray = generateTripItemArray(TRIP_ITEMS);
const tripGroupsByDay = groupTripEventsByBeginningOfDay(tripItemArray);

const body = document.querySelector(`.page-body`);
const tripMainView = body.querySelector(`.trip-main`);
const tripInfoView = new TripInfo(tripItemArray, Array.from(tripGroupsByDay.keys()).sort());
render(tripMainView, tripInfoView, RenderPosition.AFTERBEGIN);
render(tripInfoView, new TripInfoCost(tripItemArray), RenderPosition.BEFOREEND);

const tripControlsView = tripMainView.querySelector(`.trip-controls`);
render(tripControlsView, new Menu(), RenderPosition.BEFOREEND);
render(tripControlsView, new Filter(), RenderPosition.BEFOREEND);

const trip = new Trip(body.querySelector(`.trip-events`));
trip.init(tripGroupsByDay);
