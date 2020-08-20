import {render, RenderPosition} from "./utils";
import {generateTripItemArray} from "./mock/trip-item";
import TripInfo from "./view/trip-info.js";
import TripInfoCost from "./view/trip-info-cost";
import Menu from "./view/menu";
import Filter from "./view/filter";
import Sort from "./view/sort";
import TripEditItem from "./view/trip-edit-item";
import TripDayList from "./view/trip-day-list";
import TripDay from "./view/trip-day";
import TripItem from "./view/trip-item";
import TripEventsList from "./view/trip-events-list";
import NoItems from "./view/no-items";

const TRIP_ITEMS = 10;

const getBeginningOfDay = (ms) => {
  const date = new Date(ms);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.getTime();
};

const groupTripEventsByBeginningOfDay = (tripEvents) => {
  const map = new Map();
  tripEvents.forEach((trip) => {
    const beginningOfDay = getBeginningOfDay(trip.timeBegin);
    map.set(beginningOfDay, map.get(beginningOfDay) || []);
    map.get(beginningOfDay).push(trip);
  });
  return map;
};

const tripItemArray = generateTripItemArray(TRIP_ITEMS);
const groupDay = groupTripEventsByBeginningOfDay(tripItemArray);

const body = document.querySelector(`.page-body`);

const tripMainView = body.querySelector(`.trip-main`);
const tripInfoView = new TripInfo(tripItemArray, Array.from(groupDay.keys()).sort());
const tripInfoCostView = new TripInfoCost(tripItemArray);
render(tripMainView, tripInfoView.getElement(), RenderPosition.AFTERBEGIN);
render(tripInfoView.getElement(), tripInfoCostView.getElement(), RenderPosition.BEFOREEND);

const tripControlsView = tripMainView.querySelector(`.trip-controls`);
render(tripControlsView, new Menu().getElement(), RenderPosition.BEFOREEND);
render(tripControlsView, new Filter().getElement(), RenderPosition.BEFOREEND);

const tripEventsView = body.querySelector(`.trip-events`);

if (!tripItemArray.length) {
  render(tripEventsView, new NoItems().getElement(), RenderPosition.BEFOREEND);
} else {
  render(tripEventsView, new Sort().getElement(), RenderPosition.BEFOREEND);
}

const createTripItem = (tripEventsListElement, tripItem) => {
  const tripItemView = new TripItem(tripItem);
  const tripEditItemView = new TripEditItem(tripItem);
  render(tripEventsListElement, tripItemView.getElement(), RenderPosition.BEFOREEND);

  const buttonOnTripItemView = tripItemView.getElement().querySelector(`.event__rollup-btn`);
  const buttonOnTripEditItemView = tripEditItemView.getElement().querySelector(`.event__rollup-btn`);
  const submitButtonOnTripEditItemView = tripEditItemView.getElement().querySelector(`.event__save-btn`);
  const resetButtonOnTripEditItemView = tripEditItemView.getElement().querySelector(`.event__reset-btn`);

  buttonOnTripItemView.addEventListener(`click`, () => {
    replaceTripItemToTripEditItem();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  buttonOnTripEditItemView.addEventListener(`click`, () => {
    // сброс данных формы, tripItem не трогать
    replaceTripEditItemToTripItem();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  submitButtonOnTripEditItemView.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    // сохранение данных формы, обновление tripItem
    replaceTripEditItemToTripItem();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  resetButtonOnTripEditItemView.addEventListener(`click`, () => {
    // сброс данных формы, tripItem не трогать
    replaceTripEditItemToTripItem();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  const replaceTripItemToTripEditItem = () => {
    tripEventsListElement.replaceChild(tripEditItemView.getElement(), tripItemView.getElement());
  };

  const replaceTripEditItemToTripItem = () => {
    tripEventsListElement.replaceChild(tripItemView.getElement(), tripEditItemView.getElement());
  };

  const onEscKeyDown = (evt) => {
    if ([`Escape`, `Esc`].includes(evt.key)) {
      evt.preventDefault();
      replaceTripEditItemToTripItem();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };
};

const createTripDay = (tripDayListView, day, index) => {
  const tripDayView = new TripDay(day, index);
  render(tripDayListView.getElement(), tripDayView.getElement(), RenderPosition.BEFOREEND);
  const tripEventsListView = new TripEventsList();
  render(tripDayView.getElement(), tripEventsListView.getElement(), RenderPosition.BEFOREEND);
  groupDay.get(day).forEach((tripItem) => createTripItem(tripEventsListView.getElement(), tripItem));
};

const tripDayListView = new TripDayList();
render(tripEventsView, tripDayListView.getElement(), RenderPosition.BEFOREEND);

Array.from(groupDay.keys()).sort().forEach((day, index) => createTripDay(tripDayListView, day, index));
