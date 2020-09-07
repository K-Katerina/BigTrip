import {UpdateType} from "../const";
import {render, RenderPosition} from "../utils/render";
import FilterView from "../view/filter";

export default class Filter {
  constructor(container, filterModel) {
    this._container = container;
    this._filterModel = filterModel;
    this._currentFilterType = null;
    this._filterView = new FilterView();

    this._filterChangeHandler = this._filterChangeHandler.bind(this);
    this._modelChangeHandler = this._modelChangeHandler.bind(this);
    this._filterModel.addObserver(this._modelChangeHandler);
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

  _modelChangeHandler() {
    this._currentFilterType = this._filterModel.getFilter();
    this._filterView.updateData(this._currentFilterType);
  }
}
