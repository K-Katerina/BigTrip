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
render(tripMain, createTripInfo(tripItemArray), `afterbegin`);

const tripInfo = tripMain.querySelector(`.trip-info`);
render(tripInfo, createTripInfoCost(tripItemArray), `beforeend`);

const tripControls = body.querySelector(`.trip-controls`);
render(tripControls, createMenu(), `afterbegin`);
render(tripControls, createFilter(), `beforeend`);

const tripEvents = body.querySelector(`.trip-events`);
render(tripEvents, createSort(), `beforeend`);
render(tripEvents, createTripEditItem(tripItemArray[0]), `beforeend`);

render(tripEvents, createTripDayList(), `beforeend`);
const tripDayList = body.querySelector(`.trip-days`);

const getStartDay = (ms) => {
  const date = new Date(ms);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.getTime();
};

const groupByBeginOfDay = () => {
  const map = new Map();
  tripItemArray.forEach((trip) => {
    const startDay = getStartDay(trip.timeBegin);
    map.set(startDay, map.get(startDay) || []);
    map.get(startDay).push(trip);
  });
  return map;
};

const groupDay = groupByBeginOfDay();
Array.from(groupDay.keys()).sort().forEach((day, index) => {
  render(tripDayList, createTripDay(day, index), `beforeend`);

  const tripItemList = tripDayList.children[index].querySelector(`.trip-events__list`);
  groupDay.get(day).forEach((tripItem) => render(tripItemList, createTripItem(tripItem), `beforeend`));
});
