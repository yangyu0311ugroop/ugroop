import {
  COGNITO_ACCOUNTSTORE,
  ABILITY_DATA_STORE,
  ORGANISATION_DATA_STORE,
} from 'appConstants';
import { SET_VALUE } from 'ugcomponents/SnackBar/config';
import {
  getActivated,
  getMemberFullName,
  getMemberRole,
  getOrganisationOwnerId,
  ORGANISATION_VIEW_STORE_SELECTORS,
} from 'datastore/orgStore/selectors';
export const CONFIG = {
  value: {
    me: [COGNITO_ACCOUNTSTORE, 'account', 'id'],
    activated: getActivated,
    fullName: getMemberFullName,
    role: getMemberRole,
    ownerId: ({ orgId }) => getOrganisationOwnerId({ id: orgId }),
    abilityUpdated: [ABILITY_DATA_STORE, 'abilityUpdated'],
    showInactive: ORGANISATION_VIEW_STORE_SELECTORS.showInactive,
    allActivatedIds: ({ orgId }) => [
      ORGANISATION_DATA_STORE,
      'roles',
      orgId,
      'activated',
    ],
  },
  setValue: {
    ...SET_VALUE,
    activated: ({ orgId }) => [
      ORGANISATION_DATA_STORE,
      'roles',
      orgId,
      'activated',
    ],
  },
};
