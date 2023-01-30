import _ from 'lodash';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';

export const CONFIG = {
  value: {
    attachmentId: NODE_STORE_SELECTORS.attachmentId,
    requiresConsent: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.requiresConsent }),
    myId: COGNITO_STORE_SELECTORS.myId,
    consentId: {
      keyPath: NODE_STORE_SELECTORS.children,
      props: null,
      getter: _.first,
    },
  },
};
