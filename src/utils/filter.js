import {FILTER} from "../const";

export const getFilteredTrips = (trips, filterType) => {
  switch (filterType) {
    case FILTER.FUTURE:
      return [...trips].filter((trip) => trip.timeBegin > Date.now());
    case FILTER.PAST:
      return [...trips].filter((trip) => trip.timeEnd < Date.now());
    default:
      return trips;
  }
};
