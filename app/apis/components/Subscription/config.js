import {
  CREATE_SUBSCRIPTION_FIRSTTIME,
  GET_CUSTOMER_SUBSCRIPTION,
  SUBSCRIPTION_API,
  UPDATE_SUBSCRIPTION,
} from 'apis/constants';
import { requests } from 'utils/request';
import { CUSTOMER_NORMALISERS } from './normalisers';

export const CONFIG = {
  name: SUBSCRIPTION_API,
  requests: {
    [CREATE_SUBSCRIPTION_FIRSTTIME]: payload =>
      requests.fetchWithAuthorisation(
        'post',
        `/${SUBSCRIPTION_API}/firstTimeSubscription`,
        payload,
      ),
    [GET_CUSTOMER_SUBSCRIPTION]: ({ id, type }) =>
      requests.fetchWithAuthorisation(
        'get',
        `/${SUBSCRIPTION_API}/${id}/${type}`,
      ),
    [UPDATE_SUBSCRIPTION]: ({ subscriptionId, data }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${SUBSCRIPTION_API}/${subscriptionId}`,
        data,
      ),
  },
  processResult: {
    [GET_CUSTOMER_SUBSCRIPTION]: CUSTOMER_NORMALISERS.upsertCustomer,
    [UPDATE_SUBSCRIPTION]: CUSTOMER_NORMALISERS.upsertSubscription,
  },
  onSuccess: {},
  value: {},
  setValue: {},
};
