import { COUPON_API, GET_COUPON } from 'apis/constants';
import { requests } from 'utils/request';

export const CONFIG = {
  name: COUPON_API,
  requests: {
    [GET_COUPON]: id =>
      requests.fetchWithAuthorisation('get', `/${COUPON_API}/${id}`),
  },
};
