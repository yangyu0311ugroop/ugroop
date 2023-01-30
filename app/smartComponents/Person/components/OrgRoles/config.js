import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from '../../../../datastore/templateManagementStore/selectors';

export const CONFIG = {
  value: {
    userId: USER_STORE_SELECTORS.userId,
    selectedOrgId: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.selectedOrgId,
  },
  setValue: {},
};
