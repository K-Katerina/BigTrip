import {TYPE_TRIP_ITEM_IN, TYPE_TRIP_ITEM_TO, getInOrTo, getBlackTrip} from "../const";
import flatpickr from "flatpickr";
import he from "he";
import {parseTime, parseDate, capitalizeWord} from "../utils/common";
import {Smart} from "./smart";
import OffersModel from "../model/offers";
import DestinationsModel from "../model/destination";
import "../../node_modules/flatpickr/dist/flatpickr.min.css";


const fillTypeGroup = (types) => {
  return types.map((typeTrip) =>
    `<div class="event__type-item">
      <input id="event-type-${typeTrip.toLowerCase()}-${typeTrip.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeTrip.toLowerCase()}">
      <label class="event__type-label  event__type-label--${typeTrip.toLowerCase()}" for="event-type-${typeTrip.toLowerCase()}-${typeTrip.id}">${capitalizeWord(typeTrip)}</label>
    </div>`
  ).join(``);
};

const getOffers = (tripItem, isDisabled) => {
  return OffersModel.getOffersForType(tripItem.type).map((offer, index) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${tripItem.type}-${tripItem.id}-${index}" type="checkbox" name="event-offer-${tripItem.type}" ${tripItem.offers.find((item) => offer.title === item.title) ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
      <label class="event__offer-label" for="event-offer-${tripItem.type}-${tripItem.id}-${index}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&nbsp;&euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`
  ).join(``);
};

const getPhoto = (photos) => {
  return photos.map((photo) =>
    `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`).join(``);
};

const getCity = () => {
  return DestinationsModel.getDestinations().map((destination) => destination.city);
};

const createTripEditItemTemplate = (tripItem) => {
  const {isDisabled} = tripItem;
  const isSubmitDisabled = tripItem.timeBegin >= tripItem.timeEnd || tripItem.isDeleting;
  const isNewForm = !tripItem.id;
  const deleteText = tripItem.isDeleting ? `Deleting...` : `Delete`;
  return (`
    <div class="trip-events__item">
      <form class="trip-events__item event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${tripItem.id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${tripItem.type.toLowerCase()}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${tripItem.id}" type="checkbox" ${isDisabled ? `disabled` : ``}>

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>
                ${fillTypeGroup(TYPE_TRIP_ITEM_TO)}
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>
                    ${fillTypeGroup(TYPE_TRIP_ITEM_IN)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${tripItem.id}">
              ${capitalizeWord(tripItem.type)} ${getInOrTo(tripItem.type)}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${tripItem.id}" type="text" name="event-destination" value="${he.encode(tripItem.city)}" list="destination-list-${tripItem.id}" ${isDisabled ? `disabled` : ``}>
            <datalist id="destination-list-${tripItem.id}">
              ${getCity().map((city) => `<option value="${city}"></option>\n`).join(``)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${tripItem.id}">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time" type="text" required name="event-start-time" value="${parseDate(tripItem.timeBegin)} ${parseTime(tripItem.timeBegin)}" ${isDisabled ? `disabled` : ``}>
            &mdash;
            <label class="visually-hidden" for="event-end-time-${tripItem.id}">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time" type="text" required name="event-end-time" value="${parseDate(tripItem.timeEnd)} ${parseTime(tripItem.timeEnd)}" ${isDisabled ? `disabled` : ``}>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${tripItem.id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${tripItem.id}" type="number" name="event-price" value="${tripItem.cost}" ${isDisabled ? `disabled` : ``}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled ? `disabled` : ``}>${tripItem.isSaving ? `Saving...` : `Save`}</button>
          <button class="event__reset-btn" type="reset" ${isDisabled ? `disabled` : ``}>${isNewForm ? `Close` : deleteText}</button>

          ${isNewForm ? `` : `<input id="event-favorite-${tripItem.id}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${tripItem.isFavorite ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
          <label class="event__favorite-btn" for="event-favorite-${tripItem.id}">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>`}

          ${isNewForm ? `` : `<button class="event__rollup-btn" type="button" ${isDisabled ? `disabled` : ``}>
                                <span class="visually-hidden">Open event</span>
                              </button>`}
        </header>

        <section class="event__details">
          <section class="event__section event__section--offers ${OffersModel.getOffersForType(tripItem.type).length ? `` : `visually-hidden`}">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${getOffers(tripItem, isDisabled)}
            </div>
          </section>
          <section class="event__section event__section--destination ${DestinationsModel.getDestinationsForCity(tripItem.city) ? `` : `visually-hidden`}">
            <h3 class="event__section-title event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${DestinationsModel.getDestinationsForCity(tripItem.city).desc}</p>
            <div class="event__photos-container ${DestinationsModel.getDestinationsForCity(tripItem.city).photo.length ? `` : `visually-hidden`}">
              <div class="event__photos-tape">
                ${getPhoto(DestinationsModel.getDestinationsForCity(tripItem.city).photo)}
              </div>
            </div>
          </section>
        </section>
      </form>
    </div>
  `);
};

export default class TripEditItem extends Smart {
  constructor(tripEditItem = getBlackTrip()) {
    super();
    this._data = Object.assign({}, tripEditItem);
    this._datepickerBegin = null;
    this._datepickerEnd = null;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._timeBeginChangeHandler = this._timeBeginChangeHandler.bind(this);
    this._timeEndChangeHandler = this._timeEndChangeHandler.bind(this);
    this._typeClickHandler = this._typeClickHandler.bind(this);
    this._cityChangeHandler = this._cityChangeHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._costChangeHandler = this._costChangeHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);
    this.restoreHandlers();
  }

  restoreHandlers() {
    this._setDatepicker();
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._deleteClickHandler);
    if (this.getElement().querySelector(`.event__rollup-btn`)) {
      this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._closeClickHandler);
    }
    Array.from(this.getElement().querySelectorAll(`.event__type-input`)).forEach((eventTypeItem) => eventTypeItem.addEventListener(`click`, this._typeClickHandler));
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`change`, this._cityChangeHandler);
    if (this.getElement().querySelector(`.event__favorite-btn`)) {
      this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
    }
    this.getElement().querySelector(`.event__input--price`).addEventListener(`change`, this._costChangeHandler);
    Array.from(this.getElement().querySelectorAll(`.event__offer-checkbox`)).forEach((eventOffer) => eventOffer.addEventListener(`click`, this._offersChangeHandler));
  }

  removeElement() {
    super.removeElement();

    if (this._datepickerBegin) {
      this._datepickerBegin.destroy();
      this._datepickerBegin = null;
    }
    if (this._datepickerEnd) {
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
    }
  }

  getTemplate() {
    return createTripEditItemTemplate(this._data);
  }

  formEditSubmitHandler(callback) {
    this._callback.formSubmit = callback;
  }

  deleteEditFormClickHandler(callback) {
    this._callback.deleteClick = callback;
  }

  closeEditFormClickHandler(callback) {
    this._callback.editClick = callback;
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(Object.assign({}, this._data));
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(this._data);
  }

  _closeClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick(!this._data.isFavorite);
    this.updateData({isFavorite: !this._data.isFavorite});
  }

  _timeBeginChangeHandler(selectedDates) {
    this.updateData({timeBegin: selectedDates[0]});
  }

  _timeEndChangeHandler(selectedDates) {
    this.updateData({timeEnd: selectedDates[0]});
  }

  _getFlatpickr(element, msDefaultDate, dateChangeHandler) {
    return flatpickr(
        element,
        {
          enableTime: true,
          dateFormat: `d/m/Y H:i`,
          defaultDate: new Date(msDefaultDate) || new Date(),
          onChange: dateChangeHandler
        }
    );
  }

  _setDatepicker() {
    if (this._datepickerBegin) {
      this._datepickerBegin.destroy();
      this._datepickerBegin = null;
    }
    if (this._datepickerEnd) {
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
    }
    this._datepickerBegin = this._getFlatpickr(this.getElement().querySelector(`#event-start-time`), this._data.timeBegin, this._timeBeginChangeHandler);
    this._datepickerEnd = this._getFlatpickr(this.getElement().querySelector(`#event-end-time`), this._data.timeEnd, this._timeEndChangeHandler);
  }

  _typeClickHandler(evt) {
    evt.preventDefault();
    const type = evt.target.value;
    this.updateData({type, offers: []});
  }

  _offersChangeHandler(evt) {
    evt.preventDefault();
    const offerChanged = OffersModel.getOffersForType(this._data.type).find((offer) =>
      offer.title === this.getElement().querySelector(`label[for="${evt.target.id}"] .event__offer-title`).textContent);
    let updatedOffers = [];
    if (evt.target.checked) {
      updatedOffers = [...this._data.offers, offerChanged];
    } else {
      updatedOffers = [...this._data.offers.filter((offer) => offer.title !== offerChanged.title)];
    }
    this.updateData({offers: updatedOffers});
  }

  _cityChangeHandler(evt) {
    evt.preventDefault();
    const city = evt.target.value;
    const destination = DestinationsModel.getDestinationsForCity(city).destination;
    const photo = DestinationsModel.getDestinationsForCity(city).photo;
    this.updateData({city, destination: {destination, photo}});
  }

  _costChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({cost: evt.target.value}, true);
  }
}

