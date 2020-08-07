import {createTripInfo} from "./view/trip-info.js";
import {createTripInfoCost} from "./view/trip-info-cost";
import {createMenu} from "./view/menu";
import {createFilter} from "./view/filter";
import {createSort} from "./view/sort";
import {createTripEditItem} from "./view/trip-edit-item";
import {createTripDayList} from "./view/trip-day-list";
import {createTripDay} from "./view/trip-day";
import {createTripItem} from "./view/trip-item";
import {render} from "./utils";
import {generateTripItemArray} from "./mock/trip-item";

const TRIP_ITEMS = 15;

const tripItemArray = generateTripItemArray(TRIP_ITEMS);

const body = document.querySelector(`.page-body`);

const tripMain = body.querySelector(`.trip-main`);
render(tripMain, createTripInfo(), `afterbegin`);

const tripInfo = tripMain.querySelector(`.trip-info`);
render(tripInfo, createTripInfoCost(), `beforeend`);

const tripControls = body.querySelector(`.trip-controls`);
render(tripControls, createMenu(), `afterbegin`);
render(tripControls, createFilter(), `beforeend`);

const tripEvents = body.querySelector(`.trip-events`);
render(tripEvents, createSort(), `beforeend`);
render(tripEvents, createTripEditItem(tripItemArray[0]), `beforeend`);

render(tripEvents, createTripDayList(), `beforeend`);

const tripDayList = body.querySelector(`.trip-days`);
render(tripDayList, createTripDay(), `beforeend`);

const tripItemList = tripDayList.children[0].querySelector(`.trip-events__list`);
tripItemArray.forEach((tripItem) => render(tripItemList, createTripItem(tripItem), `beforeend`));
