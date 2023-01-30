import { GET_PERSON_DETAIL, PERSON_DETAIL_API } from 'apis/constants';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

export const ADMIN_NAVBAR = 'dashboardViewStore';

export const CONFIG = {
  isLoading: {
    fetching: [PERSON_DETAIL_API, GET_PERSON_DETAIL],
  },
  value: {
    knownAs: USER_STORE_SELECTORS.knownAs,
    email: USER_STORE_SELECTORS.email,
    openMenu: [ADMIN_NAVBAR, 'openProfileMenu'],
  },
  setValue: {
    openMenu: [ADMIN_NAVBAR, 'openProfileMenu'],
  },
};
