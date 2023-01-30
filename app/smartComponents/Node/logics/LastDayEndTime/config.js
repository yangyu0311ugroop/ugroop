import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { get } from 'lodash';
import MOMENT_HELPERS from 'utils/helpers/moment';

export const CONFIG = {
  value: {
    endTime: {
      cacheKey: ({ id }) => `${id}.endTime`,
      keyPath: NODE_STORE_SELECTORS.calculatedStartTime,
      props: null,
      getter: startTime => {
        if (!get(startTime, 'real')) {
          return null;
        }

        return MOMENT_HELPERS.setTimeZone(startTime.value, startTime.timeZoneId)
          .hour(23)
          .minute(59)
          .second(59);
      },
    },
  },

  setValue: {
    endTime: ({ template }) =>
      NODE_STORE_SELECTORS.calculatedEnd({ id: template }),
  },
};
