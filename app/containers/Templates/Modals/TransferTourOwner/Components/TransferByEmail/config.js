import { COGNITO_ACCOUNTSTORE } from 'appConstants';
import { GET_PERSON, TEMPLATE_API } from 'apis/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    myEmail: [COGNITO_ACCOUNTSTORE, 'account', 'email'],
    createdBy: NODE_STORE_SELECTORS.createdBy,
  },
};

export const CONFIG2 = {
  value: {
    ownerEmail: ({ createdBy }) =>
      USER_STORE_SELECTORS.email({ id: createdBy }),
  },
  setValue: {
    transferToUserId: NODE_STORE_SELECTORS.nodeTransferToUserId,
    transferToEmail: NODE_STORE_SELECTORS.nodeTransferTo,
  },
  isLoading: {
    fetching: [TEMPLATE_API, GET_PERSON],
  },
};
