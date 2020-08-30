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
  const date = new Date(ms);
  return `${date.getHours()}:${date.getMinutes()}`;
};

export const parseDate = (ms) => {
  const date = new Date(ms);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const getDuration = (begin, end) => {
  let delta = Math.floor((end - begin) / 1000);
  const days = Math.floor(delta / 86400);
  delta -= days * 86400;
  const hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;
  const minutes = Math.floor(delta / 60) % 60;
  return (days > 0 ? days + `d ` : ``)
    + (hours > 0 ? hours + `h ` : ``)
    + minutes + `m`;
};

export const capitalizeWord = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};
