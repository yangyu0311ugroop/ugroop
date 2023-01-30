import { COGNITO_ACCOUNTSTORE } from 'appConstants';
import { getMemberRole } from 'datastore/orgStore/selectors';

export const CONFIG_MY_PROFILE = {
  value: {
    me: [COGNITO_ACCOUNTSTORE, 'account', 'id'],
  },
  setValue: {},
};

export const CONFIG = {
  value: {
    myRole: ({ me }) => getMemberRole({ id: me }),
  },
  setValue: {},
};
