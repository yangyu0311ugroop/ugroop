import {
  COGNITO_ACCOUNTSTORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
} from 'appConstants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';

export const CONFIG = {
  value: {
    parentType: {
      keyPath: NODE_STORE_SELECTORS.parentType,
      getter: NODE_STORE_HELPERS.translateType,
    },
    me: [COGNITO_ACCOUNTSTORE, 'account', 'id'],
    status: NODE_STORE_SELECTORS.status,
  },
  setValue: {
    editChecklistId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'editChecklistId'],
    addChecklistParentId: [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'addChecklistParentId',
    ],
    ...PORTAL_HELPERS.setValue,
  },
};
