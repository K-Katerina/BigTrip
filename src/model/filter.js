import Observer from '../utils/observer.js';
import {FILTER} from "../const";

export default class Filter extends Observer {
  constructor() {
    super();
    this._currentFilter = FILTER.EVERYTHING;
  }

  setFilter(updateType, filter) {
    this._currentFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._currentFilter;
  }
}
