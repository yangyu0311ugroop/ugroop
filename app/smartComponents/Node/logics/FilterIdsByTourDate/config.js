import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import { moment } from 'utils/index';
import momentjs from 'moment/moment';
import { get } from 'lodash';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

const cacheKey = 'tourDateIds';
const filterFunctionKey = 'filterFunction';

const isSameDay = (dayDate, toDate, isDateSet) => {
  if (!isDateSet) return true; // return all if date not set
  if (!dayDate || !toDate) {
    return false;
  }
  const tourDate = momentjs(dayDate);
  const photoDate = momentjs(toDate);
  return moment.isSameDay(tourDate, photoDate);
};

export const SELECTED_TOUR_CONFIG = {
  value: {
    dayId: RESAGA_HELPERS.subscribeIfNotGiven(
      [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedId'],
      'dayId',
    ),
  },
};

export const TOUR_DATES_CONFIG = {
  value: {
    calculatedDate: ({ dayId }) =>
      NODE_STORE_SELECTORS.calculatedStartTimeValue({ id: dayId }),
    isDateSet: ({ dayId }) =>
      NODE_STORE_SELECTORS.calculatedStartTimeReal({ id: dayId }),
  },
};

export const CONFIG = {
  value: {
    values: {
      cacheKey: ({ ids, id, dayId, calculatedDate }) =>
        `${cacheKey}.${
          ids ? ids.toString() : null
        }.${calculatedDate}.${id},${dayId}.${filterFunctionKey}.filter`,
      keyPath: ({ ids }) =>
        ids.map(id => NODE_STORE_SELECTORS.createdAt({ id })),
      props: ({ ids }) => ({ ids }),
      getter: (...values) => {
        const props = values.pop();
        const { ids } = props;

        return values.map((value, index) => [value, ids[index]]);
      },
    },
    filteredIds: {
      getter: ({ values, calculatedDate, isDateSet }) =>
        values
          .slice()
          .filter(val => isSameDay(calculatedDate, get(val, '0'), isDateSet))
          .map(val => get(val, '1')),
    },
  },
};
