import { USER_DATA_STORE } from 'appConstants';
import { getRoleMembersIds } from 'datastore/orgStore/selectors';

export const CONFIG = {
  value: {
    members: ({ organisationId }) => getRoleMembersIds({ id: organisationId }),
    userId: [USER_DATA_STORE, 'userId'],
  },
  setValue: {},
};
