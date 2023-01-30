import {
  getPeopleIds,
  getPendingInvitations,
  getMemberIdsAndEmail,
  getMemberIdsAndActivated,
  ORGANISATION_VIEW_STORE_SELECTORS,
  ORGANISATION_STORE_SELECTORS,
} from 'datastore/orgStore/selectors';
import { ORGANISATION_API, GET_ORG_MEMBERS } from 'apis/constants';
import { PORTAL_HELPERS } from '../../../../../../../Portal/helpers';
export const CONFIG_PEOPLEIDS = {
  value: {
    roleMemberIds: getPeopleIds,
  },
};
export const CONFIG = {
  value: {
    role: ORGANISATION_STORE_SELECTORS.role,
    roleMemberPendingIds: getPendingInvitations,
    peopleIds: getMemberIdsAndEmail,
    peopleIdsWithActivated: getMemberIdsAndActivated,
    showInactive: ORGANISATION_VIEW_STORE_SELECTORS.showInactive,
  },
  setValue: {
    showInactive: ORGANISATION_VIEW_STORE_SELECTORS.showInactive,
    ...PORTAL_HELPERS.setValue,
  },
  isLoading: {
    isMemberFetching: [ORGANISATION_API, GET_ORG_MEMBERS],
  },
};
