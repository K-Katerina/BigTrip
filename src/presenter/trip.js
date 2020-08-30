import {deleteItem, render, RenderPosition, updateItem} from "../utils/render";
import {groupTripEventsByBeginningOfDay} from "../utils/common";
import TripDay from "../view/trip-day";
import TripEventsList from "../view/trip-events-list";
import TripDayList from "../view/trip-day-list";
import NoItems from "../view/no-items";
import Sort from "../view/sort";
import {SORT, SORT_DEFAULT} from "../const";
import FormTrip from "./form-trip";

export default class Trip {
  constructor(container) {
    this._container = container;
    this._currentSortType = SORT_DEFAULT;
    this._trips = [];
    this._tripsEvent = {};
    this._tripDayListComponent = new TripDayList();
    this._noEventsComponent = new NoItems();
    this._sortComponent = new Sort();
    // this._createNewEventButton;
    this._handleTripChange = this._handleTripChange.bind(this);
    this._handleTripDelete = this._handleTripDelete.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(trips) {
    if (!trips.length) {
      render(this._container, this._noEventsComponent, RenderPosition.BEFOREEND);
      return;
    }
    this._trips = [...trips];
    this._renderSort();
    this._renderDayList();
    this._sortEvents(this._currentSortType);
  }

  _handleTripChange(updatedTrip) {
    this._trips = updateItem(this._trips, updatedTrip);
    this._tripsEvent[updatedTrip.id].init(updatedTrip);
    this.init(this._trips);
  }

  _handleTripDelete(deletedTrip) {
    this._trips = deleteItem(this._trips, deletedTrip);
    this.init(this._trips);
  }

  _handleModeChange() {
    Object
      .values(this._tripsEvent)
      .forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortEvents(sortType);
  }

  _sortEvents(sortType) {
    this._currentSortType = sortType;

    let sortedEvents;
    switch (sortType) {
      case SORT.TIME:
        sortedEvents = [...this._trips].sort((a, b) => (b.timeEnd - b.timeBegin) - (a.timeEnd - a.timeBegin));
        break;
      case SORT.PRICE:
        sortedEvents = [...this._trips].sort((a, b) => b.cost - a.cost);
        break;
      default:
        sortedEvents = groupTripEventsByBeginningOfDay(this._trips);
    }
    this._renderEventList(sortedEvents, sortType === SORT_DEFAULT);
  }

  _createTripItem(tripEventsListView, tripItem) {
    const tripEvent = new FormTrip(tripEventsListView, this._handleTripChange, this._handleTripDelete, this._handleModeChange);
    tripEvent.init(tripItem);
    this._tripsEvent[tripItem.id] = tripEvent;
  }

  _createTripDay(tripDayListView, trips, isDefaultSorting, day = 0, index = 0) {
    const tripDayView = new TripDay(day, index, isDefaultSorting);
    render(tripDayListView, tripDayView, RenderPosition.BEFOREEND);
    const tripEventsListView = new TripEventsList();
    render(tripDayView, tripEventsListView, RenderPosition.BEFOREEND);
    trips.forEach((tripItem) => this._createTripItem(tripEventsListView.getElement(), tripItem));
  }

  _renderEventList(trips, isDefaultSorting) {
    this._tripDayListComponent.getElement().innerHTML = ``;
    if (isDefaultSorting) {
      Array.from(trips.keys())
        .sort()
        .forEach((day, index) => {
          this._createTripDay(this._tripDayListComponent, trips.get(day), isDefaultSorting, day, index);
        });
    } else {
      this._createTripDay(this._tripDayListComponent, trips, isDefaultSorting);
    }
  }

  _renderSort() {
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderDayList() {
    render(this._container, this._tripDayListComponent, RenderPosition.BEFOREEND);
  }
}
