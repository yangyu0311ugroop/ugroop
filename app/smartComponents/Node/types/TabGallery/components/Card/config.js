import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { NODE_VIEW_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';

export const CONFIG = {
  value: {
    selectDayId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedId'],
    editable: NODE_VIEW_STORE_SELECTORS.editable,
  },
  setValue: {
    ...PORTAL_HELPERS.setValue,
  },
};
