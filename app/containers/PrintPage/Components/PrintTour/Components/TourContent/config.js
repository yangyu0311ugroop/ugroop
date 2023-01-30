import { NODE_STORE } from 'appConstants';
import { NODE_SCHEMA } from 'datastore/nodeStore/schema';

export const CONFIG = {
  value: {
    dayIds: ({ tabId }) => [NODE_STORE, 'nodes', tabId, 'children'],
  },
};

export const DAY_CONFIG = {
  value: {
    days: {
      keyPath: ({ dayIds }) => {
        if (!dayIds) {
          return [];
        }
        return dayIds.map(dayId => [NODE_STORE, 'nodes', dayId]);
      },
      cacheKey: ({ dayIds }) =>
        `PrintTour.TourContent.days.${dayIds ? dayIds.toString() : null}.days`,
      props: () => null,
      getter: (...args) => args,
    },
  },
};

export const NORMALISED_DAYS_CONFIG = {
  value: {
    normalisedDays: {
      getter: ({ days }) => {
        const filteredDays = days.filter(day => day !== null);
        const d =
          (filteredDays.length && NODE_SCHEMA.normalisedDay(filteredDays)) ||
          {};
        const returned = d !== {} ? d.days : {};
        return returned;
      },
    },
  },
};
