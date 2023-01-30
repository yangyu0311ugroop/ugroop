import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    isDateSet: ({ dayId }) =>
      NODE_STORE_SELECTORS.calculatedStartTimeReal({ id: dayId }),
  },
  setValue: {
    ...PORTAL_HELPERS.setValue,
  },
};
