import _ from 'lodash';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';

export const CONFIG = {
  value: {
    consentId: {
      keyPath: NODE_STORE_SELECTORS.children,
      props: null,
      getter: _.first,
    },
    myId: COGNITO_STORE_SELECTORS.myId,
  },
};
