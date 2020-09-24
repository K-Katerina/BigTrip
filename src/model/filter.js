import Observer from '../utils/observer.js';
import {FilterType} from "../const";

export default class Filter extends Observer {
  constructor() {
    super();
    this._currentFilter = Filter.EVERYTHING;
  }

  setFilter(updateType, filter) {
    if (this._currentFilter !== filter) {
      this._currentFilter = filter;
      this._notify(updateType, filter);
    }
  }

  getFilter() {
    return this._currentFilter;
  }
}
