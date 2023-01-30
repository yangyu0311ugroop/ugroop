import { get } from 'lodash';
import { INVITATION_API, DECLINE_INVITATION } from 'apis/constants';

export const CONFIG = {
  isLoading: {
    loading: [INVITATION_API, DECLINE_INVITATION],
  },

  value: {
    tokenId: {
      getter: ({ match }) => get(match, 'params.token'),
    },
  },
  setValue: {},
};
