import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import {
  TEMPLATE_MANAGEMENT_STORE_SELECTORS,
  TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS,
} from 'datastore/templateManagementStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { PORTAL_HELPERS } from '../../../../../../../../../../../../../../Portal/helpers';

export const CONFIG_0 = {
  value: {
    userId: USER_STORE_SELECTORS.userId(),
    id: TEMPLATE_MANAGEMENT_STORE_SELECTORS.templateId,
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
    orgUserIds: USER_STORE_SELECTORS.orgUserId,
    selectedOrgId: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.selectedOrgId,
  },
  setValue: {},
};

export const SET_VALUE = {
  setValue: {
    showOrgInvite:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.showOrganisationInvitation,
    inviteeId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'inviteeId'],
    inviteeToken: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'inviteeToken'],
    inviteeEmail: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'inviteeEmail'],
    currentProcessId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'currentProcessId'],
    selectedOrgId: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.selectedOrgId,
    ...PORTAL_HELPERS.setValue,
  },
};
