import moment from "moment";

export const getRandomNumberOfRange = (a, b) => {
  return Math.round(a + Math.random() * (b - a));
};

export const getRandomArray = (array) => {
  return shuffle(array).slice(0, getRandomNumberOfRange(0, array.length));
};

export const getRandomItemFromArray = (array) => {
  return shuffle(array)[0];
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getBeginningOfDay = (ms) => {
  const date = new Date(ms);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.getTime();
};

export const groupTripEventsByBeginningOfDay = (tripEvents) => {
  const map = new Map();
  tripEvents.forEach((trip) => {
    const beginningOfDay = getBeginningOfDay(trip.timeBegin);
    map.set(beginningOfDay, map.get(beginningOfDay) || []);
    map.get(beginningOfDay).push(trip);
  });
  return map;
};

export const parseTime = (ms) => {
  return moment(ms).format(`HH:mm`);
};

export const parseDate = (ms) => {
  return moment(ms).format(`DD-MM-YYYY HH:mm`);
};

export const getDuration = (begin, end) => {
  const result = [];
  const duration = moment.duration(moment(end).diff(moment(begin)));
  if (duration.days() > 0) {
    result.push(`${duration.days()}d`);
  }
  if (duration.hours() > 0) {
    result.push(`${duration.hours()}h`);
  }
  if (duration.minutes() >= 0) {
    result.push(`${duration.minutes()}m`);
  }
  return result.join(` `);
};

export const capitalizeWord = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const getId = () => Date.now() + parseInt(Math.random() * 10000, 10);
