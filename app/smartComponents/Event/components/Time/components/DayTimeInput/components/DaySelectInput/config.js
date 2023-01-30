/**
 * Created by stephenkarpinskyj on 5/9/18.
 */

import { EVENT_STORE_VIEW_SELECTORS } from 'datastore/eventStore/selectors';

export const CONFIG = {
  setValue: {
    calculatedTimeValue: ({ calculatedTimeValuePath }) =>
      EVENT_STORE_VIEW_SELECTORS.eventFormProp({
        path: calculatedTimeValuePath,
      }),
    calculatedTimeMode: ({ calculatedTimeModePath }) =>
      EVENT_STORE_VIEW_SELECTORS.eventFormProp({
        path: calculatedTimeModePath,
      }),
  },
};

export default CONFIG;
