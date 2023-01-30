import get from 'lodash/get';
import head from 'lodash/head';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    startTime: {
      cacheKey: ({ id }) => `${id}.startTime`,
      keyPath: NODE_STORE_SELECTORS.calculatedStartTime,
      props: null,
      getter: startTime => {
        if (!get(startTime, 'real')) {
          return null;
        }

        return MOMENT_HELPERS.setTimeZone(
          startTime.value,
          startTime.timeZoneId,
        );
      },
    },
    firstEvent: {
      getter: ({ events }) => {
        const event = head(events);
        return {
          firstEventTime: get(event, 'value'),
          firstEventId: get(event, 'id'),
        };
      },
      spreadObject: true,
    },
  },

  setValue: {
    startTime: ({ template }) =>
      NODE_STORE_SELECTORS.calculatedStart({ id: template }),
    firstEventId: ({ template }) =>
      NODE_STORE_SELECTORS.calculatedFirstEventId({ id: template }),
  },
};

export const CONFIG1 = {
  value: {
    eventIds: NODE_STORE_SELECTORS.calculatedEventIds,
  },
};
