import {MONTH_NAMES} from "../const";

export const createTripDay = (day, index) => {
  const date = new Date(day);
  return (`
    <li class="trip-days__item day">
      <div class="day__info">
        <span class="day__counter">${index + 1}</span>
        <time class="day__date" datetime="${date}">${MONTH_NAMES[date.getMonth()]} ${date.getDate()}</time>
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>
  `);
};
