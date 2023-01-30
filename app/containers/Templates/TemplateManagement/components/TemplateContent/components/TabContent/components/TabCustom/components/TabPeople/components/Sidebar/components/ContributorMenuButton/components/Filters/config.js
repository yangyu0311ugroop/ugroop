import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import {
  TEMPLATE_MANAGEMENT_STORE_SELECTORS,
  TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS,
} from 'datastore/templateManagementStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

export const CONFIG_IDS = {
  value: {
    templateId: TEMPLATE_MANAGEMENT_STORE_SELECTORS.templateId,
    userId: USER_STORE_SELECTORS.userId(),
  },
};

export const CONFIG = {
  value: {
    shareListFilter: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.shareListFilter,
    peopleView: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleView,
    filterRoleBy: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.filterRoleBy,
    orgId: {
      keyPath: [
        NODE_STORE_SELECTORS.organisationId,
        USER_STORE_SELECTORS.orgUserId,
      ],
      getter: (orgId, orgUerIds = []) => {
        const orgIds = orgUerIds.filter(id => id > 0);
        if (orgIds.includes(orgId)) {
          return orgId;
        }
        if (orgIds.length > 0) {
          return orgIds[0];
        }
        return null;
      },
    },
    orgUserIds: USER_STORE_SELECTORS.orgUserId,
    peopleTabOptionSelected:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleTabOptionSelected,
  },
  setValue: {
    shareListFilter: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.shareListFilter,
    peopleView: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleView,
    filterRoleBy: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.filterRoleBy,
    peopleTabOptionSelected:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleTabOptionSelected,
    peopleFilterSelected:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.peopleFilterSelected,
  },
};
