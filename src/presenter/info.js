import TripInfoCost from "../view/trip-info-cost";
import TripInfo from "../view/trip-info";
import {remove, render, RenderPosition} from "../utils/render";

export default class Info {
  constructor(container, tripsModel) {
    this._container = container;
    this._tripsModel = tripsModel;

    this._tripInfoComponent = null;
    this._tripInfoCostComponent = null;

    this._modelChangeHandler = this._modelChangeHandler.bind(this);
    this._tripsModel.addObserver(this._modelChangeHandler);
  }

  init() {
    if (this._tripInfoComponent) {
      remove(this._tripInfoComponent);
    }
    if (this._tripInfoCostComponent) {
      remove(this._tripInfoCostComponent);
    }
    this._tripInfoComponent = new TripInfo(this._tripsModel.getTrips());
    this._tripInfoCostComponent = new TripInfoCost(this._tripsModel.getTrips());

    render(this._container, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    render(this._tripInfoComponent, this._tripInfoCostComponent, RenderPosition.BEFOREEND);
  }

  _modelChangeHandler() {
    this.init();
  }
}
