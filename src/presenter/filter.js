import {FILTER_DEFAULT, UpdateType} from "../const";
import {render, RenderPosition} from "../utils/render";
import FilterView from "../view/filter";

export default class Filter {
  constructor(container, filterModel, tripsModel) {
    this._container = container;
    this._filterModel = filterModel;
    this._tripsModel = tripsModel;
    this._currentFilterType = FILTER_DEFAULT;
    this._filterView = new FilterView(this._currentFilterType);

    this._isPastTrip = false;
    this._isFutureTrip = false;

    this._tripsModelChangeHandler = this._tripsModelChangeHandler.bind(this);
    this._filterChangeHandler = this._filterChangeHandler.bind(this);
    this._filterModelChangeHandler = this._filterModelChangeHandler.bind(this);
    this._tripsModel.addObserver(this._tripsModelChangeHandler);
    this._filterModel.addObserver(this._filterModelChangeHandler);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();
    this._filterView.setFilterTypeChangeHandler(this._filterChangeHandler);
    render(this._container, this._filterView, RenderPosition.BEFOREEND);
  }

  _filterChangeHandler(filterType) {
    if (filterType !== this._currentFilterType) {
      this._currentFilterType = filterType;
      this._filterModel.setFilter(UpdateType.MAJOR, filterType);
    }
  }

  _filterModelChangeHandler() {
    this._currentFilterType = this._filterModel.getFilter();
    this._filterView.updateData(this._isFutureTrip, this._isPastTrip, this._currentFilterType);
  }

  _tripsModelChangeHandler() {
    this._isPastTrip = false;
    this._isFutureTrip = false;
    this._tripsModel.getTrips().forEach((trip) => {
      if (trip.timeBegin > Date.now()) {
        this._isFutureTrip = true;
      }
      if (trip.timeEnd < Date.now()) {
        this._isPastTrip = true;
      }
      if (this._isFutureTrip && this._isPastTrip) {
        return;
      }
    });
    this._filterView.updateData(this._isFutureTrip, this._isPastTrip, this._currentFilterType);
  }
}
