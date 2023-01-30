import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { COGNITO_STORE_SELECTOR } from 'datastore/stormPathStore/selectors.resaga';
export const CONFIG_FILTER = {
  value: {
    me: COGNITO_STORE_SELECTOR.userId.value,
    shareListFilter: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.shareListFilter,
    selectedOrgId: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.selectedOrgId,
    roles: {
      keyPath: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.filterRoleBy,
      props: ({ selectedRole }) => selectedRole,
      getter: (filterRoleBy, selectedRole) => {
        if (selectedRole) return selectedRole;

        return filterRoleBy;
      },
    },
  },
};
