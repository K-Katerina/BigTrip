import AbstractView from "./abstract-view";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getEmojiForTripItemType, TYPE_TRIP_ITEM_TO, typeTripItem} from "../const";
import moment from "moment";

const BAR_HEIGHT = 55;

const createStatsTemplate = () => {
  return (`
    <section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>

      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>
  `);
};

const renderMoneyChart = (moneyCtx, tripsModel) => {
  const moneyMap = new Map();
  typeTripItem.forEach((type) => {
    moneyMap[type] = 0;
  });
  tripsModel.getTrips().forEach((trip) => {
    moneyMap[trip.type.toLowerCase()] += trip.cost;
  });
  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: typeTripItem.map((item) => `${getEmojiForTripItemType(item)} ${item.toUpperCase()}`),
      datasets: [{
        data: typeTripItem.map((item) => moneyMap[item]),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        barThickness: 44,
        minBarLength: 50
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTransportChart = (transportCtx, tripsModel) => {
  const transportMap = new Map();
  TYPE_TRIP_ITEM_TO.forEach((type) => {
    transportMap[type] = 0;
  });
  tripsModel.getTrips().forEach((trip) => {
    if (TYPE_TRIP_ITEM_TO.findIndex((type) => trip.type === type) !== -1) {
      transportMap[trip.type.toLowerCase()]++;
    }
  });
  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: TYPE_TRIP_ITEM_TO.map((item) => `${getEmojiForTripItemType(item)} ${item.toUpperCase()}`),
      datasets: [{
        data: TYPE_TRIP_ITEM_TO.map((item) => transportMap[item]),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        minBarLength: 50,
        barThickness: 44,
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTimeSpendChart = (timeSpendCtx, tripsModel) => {
  const timeMap = new Map();
  typeTripItem.forEach((type) => {
    timeMap[type] = 0;
  });
  tripsModel.getTrips().forEach((trip) => {
    timeMap[trip.type.toLowerCase()] += moment(trip.timeEnd).diff(moment(trip.timeBegin));
  });
  return new Chart(timeSpendCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: typeTripItem.map((item) => `${getEmojiForTripItemType(item)} ${item.toUpperCase()}`),
      datasets: [{
        data: typeTripItem.map((item) => moment.duration(timeMap[item]).days()),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        barThickness: 44,
        minBarLength: 50
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}d`
        }
      },
      title: {
        display: true,
        text: `TIME-SPEND`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

export default class Stats extends AbstractView {
  constructor(tripsModel) {
    super();
    this._tripsModel = tripsModel;
    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpentChart = null;
    this._getStats();
  }

  getTemplate() {
    return createStatsTemplate();
  }

  _getStats() {
    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const transportCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeSpendCtx = this.getElement().querySelector(`.statistics__chart--time`);
    moneyCtx.height = BAR_HEIGHT * 6;
    transportCtx.height = BAR_HEIGHT * 4;
    timeSpendCtx.height = BAR_HEIGHT * 6;

    this._moneyChart = renderMoneyChart(moneyCtx, this._tripsModel);
    this._transportChart = renderTransportChart(transportCtx, this._tripsModel);
    this._timeSpentChart = renderTimeSpendChart(timeSpendCtx, this._tripsModel);
  }
}
