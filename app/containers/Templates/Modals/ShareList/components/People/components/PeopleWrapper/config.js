import {
  getPeopleIds,
  getRoleMembersPendingIds,
  getMemberRole,
} from 'datastore/orgStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';

export const CONFIG = {
  value: {
    orgPeopleIds: ({ orgId }) => getPeopleIds({ id: orgId }),
    orgPendingIds: ({ orgId }) => getRoleMembersPendingIds({ id: orgId }),
    ownOrgRole: ({ me }) => getMemberRole({ id: me }),
    showOrgInvite:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.showOrganisationInvitation,
    createdBy: NODE_STORE_SELECTORS.createdBy,
    selectedId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'inviteeId'],
    inviteeByEmail: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'inviteeEmail'],
    pendingUserIds: {
      keyPath: ({ pendingTokenIds = [] }) =>
        pendingTokenIds.map(token =>
          INVITATION_STORE_SELECTORS.shareToUserId({ token }),
        ),
      cacheKey: ({ pendingTokenIds, cacheKey = 'pendingInvite', orgId }) =>
        `people.wrapper.${orgId}.${cacheKey}.${
          pendingTokenIds ? pendingTokenIds.toString() : null
        }`,
      getter: (...values) => {
        values.pop();
        return values;
      },
    },
  },
  setValue: {
    showOrgInvite:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.showOrganisationInvitation,
    shareListFilter: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.shareListFilter,
    shareListTab: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.shareListTab,
  },
};
