import {getRandomNumberOfRange} from "./utils";

export const TYPE_TRIP_ITEM_TO = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
export const TYPE_TRIP_ITEM_IN = [`Check-in`, `Sightseeing`, `Restaurant`];
export const CITY_TRIP = [`Amsterdam`, `Chamonix`, `Geneva`, `Saint Petersburg`];
export const DESC = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`];
export const OFFERS = [
  {
    name: `Add luggage`,
    type: `luggage`,
    price: 30,
    checked: Boolean(getRandomNumberOfRange(0, 1))
  },
  {
    name: `Switch to comfort class`,
    type: `comfort`,
    price: 100,
    checked: Boolean(getRandomNumberOfRange(0, 1))
  },
  {
    name: `Add meal`,
    type: `meal`,
    price: 15,
    checked: Boolean(getRandomNumberOfRange(0, 1))
  },
  {
    name: `Choose seats`,
    type: `seats`,
    price: 5,
    checked: Boolean(getRandomNumberOfRange(0, 1))
  },
  {
    name: `Travel by train`,
    type: `train`,
    price: 40,
    checked: Boolean(getRandomNumberOfRange(0, 1))
  }
];

export const FILTER = [`everything`, `future`, `past`];
export const SORT = [`day`, `event`, `time`, `price`, `offers`];
export const MONTH_NAMES = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `June`, `July`, `Aug`, `Sept`, `Oct`, `Nov`, `Dec`];

export const getTypeTripItem = () => [...TYPE_TRIP_ITEM_TO, ...TYPE_TRIP_ITEM_IN];

export const getInOrTo = (type) => TYPE_TRIP_ITEM_IN.indexOf(type) > 0 ? `in` : `to`;
