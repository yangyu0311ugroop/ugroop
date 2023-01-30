import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    userPhoneId: {
      keyPath: [
        ({ id }) =>
          NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.userPhoneId }),
        ({ id }) =>
          NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.phone }),
      ],
      getter: (phoneid, phone) => {
        if (!phoneid && !phone) return 0;
        return phoneid;
      },
    },
  },
};
