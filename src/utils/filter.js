import {FilterType} from "../const";

export const getFilteredTrips = (trips, filterType) => {
  switch (filterType) {
    case FilterType.FUTURE:
      return [...trips].filter((trip) => trip.timeBegin > Date.now());
    case FilterType.PAST:
      return [...trips].filter((trip) => trip.timeEnd < Date.now());
    default:
      return trips;
  }
};
