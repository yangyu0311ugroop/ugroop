import { ORGANISATION_DATA_STORE } from 'appConstants';
import { GET_OWN_ORG_INFO, ORGANISATION_API } from 'apis/constants';

export const CONFIG = {
  isLoading: {
    fetching: [ORGANISATION_API, GET_OWN_ORG_INFO],
  },

  value: {
    orgInfo: {
      keyPath: [ORGANISATION_DATA_STORE, 'orgInfo'],
      spreadObject: true,
    },
  },
};
