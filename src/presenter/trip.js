import {render, RenderPosition, replace} from "../utils/render";
import TripItem from "../view/trip-item";
import TripEditItem from "../view/trip-edit-item";
import TripDay from "../view/trip-day";
import TripEventsList from "../view/trip-events-list";
import TripDayList from "../view/trip-day-list";
import NoItems from "../view/no-items";
import Sort from "../view/sort";

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

const createTripDay = (tripDayListView, tripGroupsByDay, day, index) => {
  const tripDayView = new TripDay(day, index);
  render(tripDayListView, tripDayView, RenderPosition.BEFOREEND);
  const tripEventsListView = new TripEventsList();
  render(tripDayView, tripEventsListView, RenderPosition.BEFOREEND);
  tripGroupsByDay.get(day).forEach((tripItem) => createTripItem(tripEventsListView.getElement(), tripItem));
};

export default class Trip {
  constructor(tripEventsView) {
    this._tripEventsView = tripEventsView;
  }
  init(tripGroupsByDay) {
    if (!tripGroupsByDay.size) {
      render(this._tripEventsView, new NoItems(), RenderPosition.BEFOREEND);
    } else {
      render(this._tripEventsView, new Sort(), RenderPosition.BEFOREEND);
    }
    const tripDayListView = new TripDayList();
    render(this._tripEventsView, tripDayListView, RenderPosition.BEFOREEND);
    Array.from(tripGroupsByDay.keys()).sort().forEach((day, index) => createTripDay(tripDayListView, tripGroupsByDay, day, index));
  }
}
