import { GET_CUSTOMER, UPDATE_CUSTOMER, CUSTOMER_API } from 'apis/constants';
import { requests } from 'utils/request';
import { CUSTOMER_NORMALISERS } from '../Subscription/normalisers';

export const CONFIG = {
  name: CUSTOMER_API,
  requests: {
    [GET_CUSTOMER]: ({ id }) =>
      requests.fetchWithAuthorisation('get', `/${CUSTOMER_API}/${id}`),
    [UPDATE_CUSTOMER]: ({ id, data }) =>
      requests.fetchWithAuthorisation('post', `/${CUSTOMER_API}/${id}`, data),
  },
  processResult: {
    [UPDATE_CUSTOMER]: CUSTOMER_NORMALISERS.updateCustomerSource,
  },
  onSuccess: {},
  value: {},
  setValue: {},
};
