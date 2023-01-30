/**
 * Created by stephenkarpinskyj on 17/9/18.
 */

import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

const selectNodeProp = (id, path) =>
  NODE_STORE_SELECTORS.nodeProp({ id, path });

export const CONFIG = {
  value: {
    startTimeValue: ({ id }) =>
      selectNodeProp(id, NODE_PATHS.calculatedStartTimeValue),
    endTimeValue: ({ id }) =>
      selectNodeProp(id, NODE_PATHS.calculatedEndTimeValue),
  },
};
