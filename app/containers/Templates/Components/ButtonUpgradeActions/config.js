import { getOrganisationOwnerId } from '../../../../datastore/orgStore/selectors';
import {
  ORGANISATION_DATA_STORE,
  USER_DATA_STORE,
} from '../../../../appConstants';

export const CONFIG = {
  value: {
    userId: [USER_DATA_STORE, 'userId'],
    orgOwnerId: ({ orgId }) => getOrganisationOwnerId({ id: orgId }),
    userOrgId: ({ orgId }) => [
      ORGANISATION_DATA_STORE,
      'orgUsers',
      orgId,
      'userId',
    ],
    role: ({ orgId }) => [ORGANISATION_DATA_STORE, 'orgUsers', orgId, 'role'],
  },
};
