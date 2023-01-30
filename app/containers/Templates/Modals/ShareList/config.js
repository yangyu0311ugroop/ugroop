import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { COGNITO_STORE_SELECTOR } from 'datastore/stormPathStore/selectors.resaga';
import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';

export const USER_ID_CONFIG = {
  value: {
    userId: COGNITO_STORE_SELECTOR.userId.value,
  },
};

export const CONFIG = {
  value: {
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
    shareListFilter: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.shareListFilter,
    selectedOrgId: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.selectedOrgId,
    orgUserIds: USER_STORE_SELECTORS.orgUserId,
  },
  setValue: {
    showOrgInvite:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.showOrganisationInvitation,
    inviteeId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'inviteeId'],
    inviteeToken: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'inviteeToken'],
    inviteeEmail: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'inviteeEmail'],
    currentProcessId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'currentProcessId'],
    selectedOrgId: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.selectedOrgId,
  },
};
