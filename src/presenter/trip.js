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

const createTripItem = (tripEventsListView, tripItem) => {
  const tripItemView = new TripItem(tripItem);
  const tripEditItemView = new TripEditItem(tripItem);
  render(tripEventsListView, tripItemView, RenderPosition.BEFOREEND);

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

const createTripDay = (tripDayListView, trips, isSortedByEvent, day = 0, index = 0) => {
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
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(trips) {
    if (!trips.length) {
      render(this._container, new NoItems(), RenderPosition.BEFOREEND);
      return;
    }
    this._trips = trips;
    this._currentSortType = SORT.EVENT;
    this._sortEvents(this._currentSortType);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortEvents(sortType);
  }

  _sortEvents(sortType) {
    this._currentSortType = sortType;
    this._renderSort();

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
    this._renderEventList(sortedEvents, sortType);
  }

  _renderEventList(trips, sortType) {
    this._tripDayListView.getElement().innerHTML = ``;
    render(this._container, this._tripDayListView, RenderPosition.BEFOREEND);
    if (sortType === SORT.EVENT) {
      Array.from(trips.keys())
        .sort()
        .forEach((day, index) => {
          createTripDay(this._tripDayListView, trips.get(day), SORT.EVENT === sortType, day, index);
        });
    } else {
      createTripDay(this._tripDayListView, trips, SORT.EVENT === sortType);
    }
  }

  _renderSort() {
    if (this._sortComponent) {
      this._container.removeChild(this._sortComponent.getElement());
      this._sortComponent.removeElement();
    }
    this._sortComponent = new Sort(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
  }
}
