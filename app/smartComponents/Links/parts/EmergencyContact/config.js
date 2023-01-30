import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    emergencyContact: NODE_STORE_SELECTORS.linkProp([
      'content',
      'emergencyContact',
    ]),
  },
  setValue: {},
};
