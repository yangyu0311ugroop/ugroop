/**
 * Created by stephenkarpinskyj on 13/9/18.
 */

import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_STORE_SELECTORS } from 'datastore/templateManagementStore/selectors';

export const CONFIG = {
  value: {
    value: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.parentNodeId }),
    defaultValue: TEMPLATE_MANAGEMENT_STORE_SELECTORS.tabId,
  },
};
