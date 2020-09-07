import {remove, render, RenderPosition} from "../utils/render";
import {getSortedTrips} from "../utils/sort";
import {getFilteredTrips} from "../utils/filter";
import {FILTER_DEFAULT, SORT_DEFAULT, UpdateType, UserAction} from "../const";
import TripDay from "../view/trip-day";
import TripEventsList from "../view/trip-events-list";
import TripDayList from "../view/trip-day-list";
import NoItems from "../view/no-items";
import Sort from "../view/sort";
import TripItem from "./trip-item";
import NewItemTrip from "./new-item-trip";

export default class Trip {
  constructor(container, tripsModel, filterModel) {
    this._container = container;
    this._tripsModel = tripsModel;
    this._filterModel = filterModel;
    this._eventChangeHandler = this._eventChangeHandler.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._tripsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._tripDayListComponent = new TripDayList();
    this._noEventsComponent = new NoItems();
    this._sortComponent = null;
    this._newTripItem = new NewItemTrip(this._container, this._eventChangeHandler);
    this._currentSortType = SORT_DEFAULT;
    this._eventPresenter = {};
  }

  init() {
    if (!this._tripsModel.getTrips().length) {
      this._currentSortType = SORT_DEFAULT;
      this._filterModel.setFilter(UpdateType.MAJOR, FILTER_DEFAULT);
      render(this._container, this._noEventsComponent, RenderPosition.BEFOREEND);
      return;
    }
    this._renderSort();
    this._renderDayList();
    this._renderEventList();
  }

  destroy() {
    this._clearTrips();
    this._clearSort();

    this._tripsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  _clearSort() {
    if (!this._sortComponent) {
      remove(this._sortComponent);
    }
    this._sortComponent = null;
  }

  _clearTrips() {
    this._newTripItem.destroy();
    Object
      .values(this._eventPresenter)
      .forEach((event) => event.destroy());
    this._eventPresenter = {};
    this._tripDayListComponent.getElement().innerHTML = ``;
  }

  createNewTrip() {
    this._filterModel.setFilter(UpdateType.MAJOR, FILTER_DEFAULT);
    this._newTripItem.init();
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this._eventPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда что-то было удалено/добавлено)
        this._clearTrips();
        this.init();
        break;
      case UpdateType.MAJOR:
        // - обновить весь маршрут (например, при переключении фильтра)
        this._currentSortType = SORT_DEFAULT;
        this._clearTrips();
        this.init();
        break;
    }
  }

  _getSortedAndFilteredTrips() {
    const filteredTrips = getFilteredTrips(this._tripsModel.getTrips(), this._filterModel.getFilter());
    return getSortedTrips(filteredTrips, this._currentSortType);
  }

  _eventChangeHandler(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.ADD:
        this._tripsModel.addTripItem(updateType, update);
        break;
      case UserAction.UPDATE:
        this._tripsModel.updateTripItem(updateType, update);
        break;
      case UserAction.DELETE:
        this._tripsModel.deleteTripItem(updateType, update);
        break;
    }
  }

  _handleModeChange() {
    this._newTripItem.destroy();
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._renderEventList();
  }

  _createTripItem(tripEventsListView, tripItem) {
    const tripEvent = new TripItem(tripEventsListView, this._eventChangeHandler, this._handleModeChange);
    tripEvent.init(tripItem);
    this._eventPresenter[tripItem.id] = tripEvent;
  }

  _createTripDay(tripDayListView, trips, isDefaultSorting, day = 0, index = 0) {
    const tripDayView = new TripDay(day, index, isDefaultSorting);
    render(tripDayListView, tripDayView, RenderPosition.BEFOREEND);
    const tripEventsListView = new TripEventsList();
    render(tripDayView, tripEventsListView, RenderPosition.BEFOREEND);
    trips.forEach((tripItem) => this._createTripItem(tripEventsListView.getElement(), tripItem));
  }

  _renderEventList(trips = this._getSortedAndFilteredTrips(this._tripsModel.getTrips()), isDefaultSorting = this._currentSortType === SORT_DEFAULT) {
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
    if (this._sortComponent) {
      remove(this._sortComponent);
    }
    this._sortComponent = new Sort();
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._container, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderDayList() {
    render(this._container, this._tripDayListComponent, RenderPosition.BEFOREEND);
  }
}
