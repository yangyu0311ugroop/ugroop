import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';

export default {
  email: {
    name: NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.email),
    autoFocus: true,
    autoComplete: 'on',
    required: true,
  },
};
