import {render, RenderPosition, replace} from "../utils/render";
import {groupTripEventsByBeginningOfDay} from "../utils/common";
import TripItem from "../view/trip-item";
import TripEditItem from "../view/trip-edit-item";
import TripDay from "../view/trip-day";
import TripEventsList from "../view/trip-events-list";
import TripDayList from "../view/trip-day-list";
import NoItems from "../view/no-items";
import Sort from "../view/sort";
import {SORT, SORT_DEFAULT} from "../const";

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

const createTripDay = (tripDayListView, trips, isDefaultSorting, day = 0, index = 0) => {
  const tripDayView = new TripDay(day, index, isDefaultSorting);
  render(tripDayListView, tripDayView, RenderPosition.BEFOREEND);
  const tripEventsListView = new TripEventsList();
  render(tripDayView, tripEventsListView, RenderPosition.BEFOREEND);
  trips.forEach((tripItem) => createTripItem(tripEventsListView.getElement(), tripItem));
};

export default class Trip {
  constructor(container) {
    this._container = container;
    this._currentSortType = SORT_DEFAULT;
    this._trips = [];
    this._tripDayListComponent = new TripDayList();
    this._noEventsComponent = new NoItems();
    this._sortComponent = new Sort();
    // this._createNewEventButton;
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(trips) {
    if (!trips.length) {
      render(this._container, this._noEventsComponent , RenderPosition.BEFOREEND);
      return;
    }
    this._trips = [...trips];
    this._renderSort();
    this._renderDayList();
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

  _renderEventList(trips, isDefaultSorting) {
    this._tripDayListComponent.getElement().innerHTML = ``;
    if (isDefaultSorting) {
      Array.from(trips.keys())
        .sort()
        .forEach((day, index) => {
          createTripDay(this._tripDayListComponent, trips.get(day), isDefaultSorting, day, index);
        });
    } else {
      createTripDay(this._tripDayListComponent, trips, isDefaultSorting);
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
