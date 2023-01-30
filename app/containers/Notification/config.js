import { GET_TOKEN, INVITATION_API } from 'apis/constants';
import { COGNITO_ACCOUNTSTORE } from 'appConstants';

export const CONFIG = {
  isLoading: {
    fetching: [INVITATION_API, GET_TOKEN],
  },

  value: {
    me: [COGNITO_ACCOUNTSTORE, 'account', 'email'],
  },
  setValue: {},
};
