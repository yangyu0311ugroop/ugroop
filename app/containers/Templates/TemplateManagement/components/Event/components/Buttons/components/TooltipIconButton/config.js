/**
 * Created by stephenkarpinskyj on 16/3/18.
 */

import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import {
  EVENT_STORE_DATA_SELECTORS,
  EVENT_STORE_VIEW_SELECTORS,
} from 'datastore/eventStore/selectors';

export const CONFIG = {
  value: {
    dataId: NODE_STORE_SELECTORS.eventDataId,
    active: NODE_STORE_SELECTORS.calculatedActive,
  },
};

export const CONFIG_EVENT_DATA = {
  value: {
    event: ({ dataId: id }) => EVENT_STORE_DATA_SELECTORS.event({ id }),
  },
  setValue: {
    eventView: EVENT_STORE_VIEW_SELECTORS.eventView,
    active: NODE_STORE_SELECTORS.calculatedActive,
    ...PORTAL_HELPERS.setValue,
  },
};
