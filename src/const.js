import DestinationsModel from "./model/destination";

export const TRIP_ITEM_TO_TYPES = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`];
export const TRIP_ITEM_IN_TYPES = [`check-in`, `sightseeing`, `restaurant`];

export const tripItemTypes = [...TRIP_ITEM_TO_TYPES, ...TRIP_ITEM_IN_TYPES];

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

export const UserAction = {
  CREATE: `CREATE`,
  UPDATE: `UPDATE`,
  DELETE: `DELETE`,
  SET_FAVORITE: `SET FAVORITE`
};

export const MenuItem = {
  TABLE: `table`,
  STATS: `stats`
};

const typeDefault = tripItemTypes[0];

const DEFAULT_COST = 100;

export const getBlackTrip = () => {
  return {
    id: null,
    type: typeDefault,
    city: DestinationsModel.getDestinations()[0].city,
    timeBegin: new Date(),
    timeEnd: new Date(new Date().setHours(new Date().getHours() + 1)),
    cost: DEFAULT_COST,
    isFavorite: false,
    offers: [],
    destination: {
      desc: DestinationsModel.getDestinations()[0].destination,
      photo: DestinationsModel.getDestinations()[0].photo
    }
  };
};

export const SORT_DEFAULT = SortType.EVENT;

export const FILTER_DEFAULT = FilterType.EVERYTHING;

export const MONTH_NAMES = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `June`, `July`, `Aug`, `Sept`, `Oct`, `Nov`, `Dec`];

export const getInOrTo = (type) => TRIP_ITEM_IN_TYPES.indexOf(type) > 0 ? `in` : `to`;

export const getEmojiForTripItemType = (type) => {
  switch (type) {
    case `taxi`:
      return `🚖`;
    case `bus`:
      return `🚌`;
    case `train`:
      return `🚋`;
    case `ship`:
      return `🚢`;
    case `transport`:
      return `🚜`;
    case `drive`:
      return `🚘`;
    case `flight`:
      return `✈️`;
    case `check-in`:
      return `🏨`;
    case `sightseeing`:
      return `🏛`;
    case `restaurant`:
      return `🍴`;
    default:
      throw new Error(`Unknowm type: ${type}`);
  }
};
