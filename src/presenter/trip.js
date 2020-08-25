import {render, RenderPosition, replace} from "../utils/render";
import {groupTripEventsByBeginningOfDay} from "../utils/common";
import TripItem from "../view/trip-item";
import TripEditItem from "../view/trip-edit-item";
import TripDay from "../view/trip-day";
import TripEventsList from "../view/trip-events-list";
import TripDayList from "../view/trip-day-list";
import NoItems from "../view/no-items";
import Sort from "../view/sort";
import {SORT} from "../const";

const createTripItem = (tripEventsListElement, tripItem) => {
  const tripItemView = new TripItem(tripItem);
  const tripEditItemView = new TripEditItem(tripItem);
  render(tripEventsListElement, tripItemView, RenderPosition.BEFOREEND);

  tripItemView.openEditFormClickHandler(() => {
    // показ формы редактирования
    replaceTripItemToTripEditItem();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  tripEditItemView.closeEditFormClickHandler(() => {
    // tripItem не трогать - несохранённые изменения пропадают.
    replaceTripEditItemToTripItem();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  tripEditItemView.deleteEditFormClickHandler(() => {
    // удаление tripItem
    replaceTripEditItemToTripItem();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  tripEditItemView.formEditSubmitHandler(() => {
    // сохранение данных формы, обновление tripItem
    replaceTripEditItemToTripItem();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  const replaceTripItemToTripEditItem = () => {
    replace(tripEditItemView, tripItemView);
  };

  const replaceTripEditItemToTripItem = () => {
    replace(tripItemView, tripEditItemView);
  };

  const onEscKeyDown = (evt) => {
    if ([`Escape`, `Esc`].includes(evt.key)) {
      evt.preventDefault();
      replaceTripEditItemToTripItem();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };
};

const createTripDay = (tripDayListView, trips, day, index, isSortedByEvent) => {
  const tripDayView = new TripDay(day, index, isSortedByEvent);
  render(tripDayListView, tripDayView, RenderPosition.BEFOREEND);
  const tripEventsListView = new TripEventsList();
  render(tripDayView, tripEventsListView, RenderPosition.BEFOREEND);

  trips.forEach((tripItem) => createTripItem(tripEventsListView.getElement(), tripItem));
};

export default class Trip {
  constructor(container) {
    this._container = container;
    // this._createNewEventButton;
    this._tripDayListView = new TripDayList();
    this._currentSortType = SORT.EVENT;
    this._sortComponent = new Sort();
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(trips) {
    if (!trips.length) {
      render(this._container, new NoItems(), RenderPosition.BEFOREEND);
      return;
    }
    this._group = new Map();
    this._trips = trips;
    this._renderSort();
    this._tripGroupsByDay = groupTripEventsByBeginningOfDay(trips);
    this._renderEventList(this._tripGroupsByDay, this._currentSortType);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._clearTaskList();
    this._sortEvents(sortType);
  }

  _sortEvents(sortType) {
    switch (sortType) {
      case SORT.TIME:
        this._renderEventList(this._group.set(0, this._trips.sort((a, b) => (b.timeEnd - b.timeBegin) - (a.timeEnd - a.timeBegin))), sortType);
        break;
      case SORT.PRICE:
        this._renderEventList(this._group.set(0, this._trips.sort((a, b) => b.cost - a.cost)), sortType);
        break;
      default:
        this._renderEventList(this._tripGroupsByDay, sortType);
    }
    this._currentSortType = sortType;
  }

  _renderEventList(trips, sortType) {
    render(this._container, this._tripDayListView, RenderPosition.BEFOREEND);
    Array.from(trips.keys()).sort().forEach((day, index) => createTripDay(this._tripDayListView, trips.get(day), day, index, SORT.EVENT === sortType));
  }

  _clearTaskList() {
    this._tripDayListView.getElement().innerHTML = ``;
  }

  _renderSort() {
    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }
}
