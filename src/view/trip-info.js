export const createTripInfo = (tripItemArray) => {
  return (`
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${[...new Set(tripItemArray.map((trip) => trip.city))].join(` &mdash; `)}</h1>
        <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
      </div>
    </section>
  `);
};
