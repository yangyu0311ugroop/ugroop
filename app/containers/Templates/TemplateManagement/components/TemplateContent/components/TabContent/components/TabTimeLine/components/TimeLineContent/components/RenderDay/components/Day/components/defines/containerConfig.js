import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {},

  setValue: {
    editing: ({ dayId }) => NODE_STORE_SELECTORS.editing({ id: dayId }),
  },
};
