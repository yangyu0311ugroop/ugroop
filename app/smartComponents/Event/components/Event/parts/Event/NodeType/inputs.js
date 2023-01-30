/**
 * Created by stephenkarpinskyj on 13/9/18.
 */

import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';

export default {
  nodeType: {
    name: NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.type),
  },
};
