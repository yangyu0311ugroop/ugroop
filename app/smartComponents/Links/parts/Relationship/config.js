import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    relationship: NODE_STORE_SELECTORS.linkProp(['content', 'relationship']),
    emergencyContact: NODE_STORE_SELECTORS.linkProp([
      'content',
      'emergencyContact',
    ]),
  },
  setValue: {},
};
