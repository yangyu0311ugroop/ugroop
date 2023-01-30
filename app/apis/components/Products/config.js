import { GET_PRODUCT_LIST, PRODUCT_API } from 'apis/constants';
import { requests } from 'utils/request';
import { PRODUCTS_NORMALISERS } from './normalisers';

export const CONFIG = {
  name: PRODUCT_API,
  requests: {
    [GET_PRODUCT_LIST]: () =>
      requests.fetchWithURL('get', `/${PRODUCT_API}`, {}),
  },
  processResult: {
    [GET_PRODUCT_LIST]: PRODUCTS_NORMALISERS.addProducts,
  },
  onSuccess: {},
  value: {},
  manuallySubscribe: true,
};
