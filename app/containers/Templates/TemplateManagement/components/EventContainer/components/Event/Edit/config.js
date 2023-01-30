/**
 * Created by stephenkarpinskyj on 15/8/18.
 */

import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import {
  EVENT_STORE_VIEW_SELECTORS,
  EVENT_STORE_DATA_SELECTORS,
} from 'datastore/eventStore/selectors';
import { EVENT_PATHS } from 'datastore/eventStore/constants';

export const CONFIG_IDS = {
  value: {
    dataId: NODE_STORE_SELECTORS.eventDataId,
    trail: NODE_STORE_SELECTORS.trail,
  },
};

export const CONFIG_DATA = {
  value: {
    templateId: {
      getter: ({ trail }) =>
        Array.isArray(trail) ? trail[trail.length - 1] : 0,
    },
    type: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({ id, path: EVENT_PATHS.type }),
    subtype: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({ id, path: EVENT_PATHS.subtype }),
    formType: EVENT_STORE_VIEW_SELECTORS.eventFormProp({
      path: EVENT_PATHS.type,
    }),
    formSubtype: EVENT_STORE_VIEW_SELECTORS.eventFormProp({
      path: EVENT_PATHS.subtype,
    }),
    iconOverride: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.iconOverride,
      }),
  },
  setValue: {
    form: EVENT_STORE_VIEW_SELECTORS.eventForm,
  },
};
