import {getRandomItemFromArray, getRandomNumberOfRange} from "./utils/common";

export const TYPE_TRIP_ITEM_TO = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`];
export const TYPE_TRIP_ITEM_IN = [`check-in`, `sightseeing`, `restaurant`];
export const CITY_TRIP = [`Amsterdam`, `Chamonix`, `Geneva`, `Saint Petersburg`];
export const DESC = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`];

const generateOffers = () => {
  const offers = [];
  for (let i = 0; i < getRandomNumberOfRange(1, 6); i++) {
    offers.push({
      title: getRandomItemFromArray(DESC),
      price: getRandomNumberOfRange(10, 200),
      checked: getRandomNumberOfRange(0, 1)
    });
  }
  return offers;
};

export const OFFERS = [
  ...TYPE_TRIP_ITEM_TO,
  ...TYPE_TRIP_ITEM_IN
].map((tripType) => {
  return {
    type: tripType,
    offers: generateOffers()
  };
});

export const FILTER = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const SORT = {
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
  ADD: `ADD`,
  UPDATE: `UPDATE`,
  DELETE: `DELETE`
};

export const SORT_DEFAULT = SORT.EVENT;

export const FILTER_DEFAULT = FILTER.EVERYTHING;

export const MONTH_NAMES = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `June`, `July`, `Aug`, `Sept`, `Oct`, `Nov`, `Dec`];

export const typeTripItem = [...TYPE_TRIP_ITEM_TO, ...TYPE_TRIP_ITEM_IN];

export const getInOrTo = (type) => TYPE_TRIP_ITEM_IN.indexOf(type) > 0 ? `in` : `to`;
