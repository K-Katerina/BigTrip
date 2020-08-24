import * as utils from "../utils/common";
import * as consts from "../const";

const MIN_COST = 10;
const MAX_COST = 1000;
const MAX_PHOTOS = 7;

const getRandomDate = () => {
  return (
    Date.now() + utils.getRandomNumberOfRange(1, 7 * 24 * 60 * 60 * 1000)
  );
};

const getTypeTrip = () => utils.getRandomItemFromArray(consts.getTypeTripItem());
const getCity = () => utils.getRandomItemFromArray(consts.CITY_TRIP);
const getCost = () => utils.getRandomNumberOfRange(MIN_COST, MAX_COST);
const getFavorite = () => Boolean(utils.getRandomNumberOfRange(0, 1));
const getOffers = () => consts.OFFERS;
const getDesc = () => utils.getRandomArray(consts.DESC).join(` `);
const getPhoto = () => Array(utils.getRandomNumberOfRange(0, MAX_PHOTOS)).fill(``).map(() => `http://picsum.photos/248/152?r=` + Math.random());

const generateTripItem = () => {
  const begin = getRandomDate();
  const end = getRandomDate();
  return {
    type: getTypeTrip(),
    city: getCity(),
    timeBegin: Math.min(begin, end),
    timeEnd: Math.max(begin, end),
    cost: getCost(),
    favorite: getFavorite(),
    offers: getOffers(),
    destination: {
      desc: getDesc(),
      photo: getPhoto()
    }
  };
};

export const generateTripItemArray = (number) => {
  return Array(number).fill(``).map(generateTripItem);
};
