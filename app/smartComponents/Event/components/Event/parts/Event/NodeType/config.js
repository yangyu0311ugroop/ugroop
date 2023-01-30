/**
 * Created by stephenkarpinskyj on 13/9/18.
 */

import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    value: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.type }),
  },
};
