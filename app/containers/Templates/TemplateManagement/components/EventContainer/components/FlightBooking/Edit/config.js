/**
 * Created by stephenkarpinskyj on 7/9/18.
 */

import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';

export const CONFIG = {
  value: {
    templateId: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.flightBookingTemplateId({ id }),
  },
};
