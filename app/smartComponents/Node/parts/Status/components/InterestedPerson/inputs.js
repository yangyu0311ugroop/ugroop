import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';

export default {
  status: {
    name: NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.status),
  },
  type: {
    name: NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.type),
  },
};
