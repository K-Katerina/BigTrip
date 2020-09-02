import {SORT} from "../const";
import {groupTripEventsByBeginningOfDay} from "./common";

export const sortEvents = (trips, sortType) => {
  switch (sortType) {
    case SORT.TIME:
      return [...trips].sort((a, b) => (b.timeEnd - b.timeBegin) - (a.timeEnd - a.timeBegin));
    case SORT.PRICE:
      return [...trips].sort((a, b) => b.cost - a.cost);
    default:
      return groupTripEventsByBeginningOfDay(trips);
  }
};
