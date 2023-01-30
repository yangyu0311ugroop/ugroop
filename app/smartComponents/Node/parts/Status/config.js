import { COGNITO_ACCOUNTSTORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';

export const CONFIG = {
  value: {
    // TODO: Move this to sub-component, not everyone rendering status wants this
    me: [COGNITO_ACCOUNTSTORE, 'account', 'id'],

    status: RESAGA_HELPERS.subscribeIfNotGiven(
      NODE_STORE_SELECTORS.status,
      'status',
    ),
    type: RESAGA_HELPERS.subscribeIfNotGiven(NODE_STORE_SELECTORS.type, 'type'),
  },
  setValue: {
    ...PORTAL_HELPERS.setValue,
  },
};
