import {SortType} from "../const";
import {groupTripEventsByBeginningOfDay} from "./common";

export const getSortedTrips = (trips, sortType) => {
  switch (sortType) {
    case SortType.TIME:
      return [...trips].sort((a, b) => (b.timeEnd - b.timeBegin) - (a.timeEnd - a.timeBegin));
    case SortType.PRICE:
      return [...trips].sort((a, b) => b.cost - a.cost);
    default:
      return groupTripEventsByBeginningOfDay(trips);
  }
};
