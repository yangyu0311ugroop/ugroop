import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const DAY_IDS_CONFIG = {
  value: {
    ids: ({ parentId }) => NODE_STORE_SELECTORS.children({ id: parentId }),

    content: NODE_STORE_SELECTORS.content,
    description: NODE_STORE_SELECTORS.description,
    origin: NODE_STORE_SELECTORS.origin,
    destination: NODE_STORE_SELECTORS.destination,
  },
};

export const CONFIG = {
  value: {},
  setValue: {
    ...PORTAL_HELPERS.setValue,
  },
};
