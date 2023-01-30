import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    content: ({ dayId }) => NODE_STORE_SELECTORS.content({ id: dayId }),
    description: ({ dayId }) => NODE_STORE_SELECTORS.description({ id: dayId }),
    location: ({ dayId }) => NODE_STORE_SELECTORS.location({ id: dayId }),
    placeId: ({ dayId }) => NODE_STORE_SELECTORS.placeId({ id: dayId }),
    icon: ({ dayId }) => NODE_STORE_SELECTORS.icon({ id: dayId }),
  },
};
