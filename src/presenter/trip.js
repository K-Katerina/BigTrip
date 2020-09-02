import {remove, render, RenderPosition} from "../utils/render";
import TripDay from "../view/trip-day";
import TripEventsList from "../view/trip-events-list";
import TripDayList from "../view/trip-day-list";
import NoItems from "../view/no-items";
import Sort from "../view/sort";
import TripItem from "./trip-item";
import {SORT_DEFAULT} from "../const";
import {sortEvents} from "../utils/sort";
import NewItemTrip from "./new-item-trip";

export default class Trip {
  constructor(container, tripsModel) {
    this._container = container;
    this._currentSortType = SORT_DEFAULT;
    this._tripsModel = tripsModel;
    this._tripsEvent = {};
    this._tripDayListComponent = new TripDayList();
    this._noEventsComponent = new NoItems();
    this._sortComponent = new Sort();
    this._handleAddTrip = this._handleAddTrip.bind(this);
    this._handleTripChange = this._handleTripChange.bind(this);
    this._handleTripDelete = this._handleTripDelete.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._newTripItem = new NewItemTrip(this._container, this._handleAddTrip);
  }

  init() {
    if (!this._tripsModel.getTrips().length) {
      render(this._container, this._noEventsComponent, RenderPosition.BEFOREEND);
      return;
    }
    this._renderSort();
    this._renderDayList();
    this._renderEventList(sortEvents(this._tripsModel.getTrips(), this._currentSortType), this._currentSortType === SORT_DEFAULT);
  }

  createNewTrip() {
    this._newTripItem.init();
  }

  _handleAddTrip(updatedTrip) {
    this._tripsModel.addTripItem(0, updatedTrip);
    this.init();
  }

  _handleTripChange(updatedTrip) {
    this._tripsModel.updateTripItem(0, updatedTrip);
    this._tripsEvent[updatedTrip.id].init(updatedTrip);
    this.init();
  }

  _handleTripDelete(deletedTrip) {
    this._tripsModel.deleteTripItem(0, deletedTrip);
    this.init();
  }

  _handleModeChange() {
    this._newTripItem.destroy();
    Object
      .values(this._tripsEvent)
      .forEach((presenter) => presenter.resetView());
  }

  _clearTrips() {
    this._newTripItem.destroy();
    Object
      .values(this._tripsEvent)
      .forEach((event) => event.destroy());
    this._tripsEvent = {};
    remove(this._sortComponent);
    remove(this._noEventsComponent);
    this._currentSortType = SORT_DEFAULT;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._renderEventList(sortEvents(this._tripsModel.getTrips(), this._currentSortType), this._currentSortType === SORT_DEFAULT);
  }

  _createTripItem(tripEventsListView, tripItem) {
    const tripEvent = new TripItem(tripEventsListView, this._handleTripChange, this._handleTripDelete, this._handleModeChange);
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
    render(this._container, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderDayList() {
    render(this._container, this._tripDayListComponent, RenderPosition.BEFOREEND);
  }
}
