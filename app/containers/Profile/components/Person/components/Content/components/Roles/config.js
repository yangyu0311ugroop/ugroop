import { GET_ROLES, USER_API } from 'apis/constants';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    orgUserIds: USER_STORE_SELECTORS.orgUsers,
  },
  setValue: {},
  isLoading: {
    isUserRolesFetching: [USER_API, GET_ROLES],
  },
};
