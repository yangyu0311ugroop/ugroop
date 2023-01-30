import { GET_PLAN_LIST, PLAN_API } from 'apis/constants';
import { requests } from 'utils/request';
import { PLANS_NORMALISERS } from './normalisers';

export const CONFIG = {
  name: PLAN_API,
  requests: {
    [GET_PLAN_LIST]: ({ query }) =>
      requests.fetchWithURL('get', `/${PLAN_API}?listOptions=${query}`),
  },
  processResult: {
    [GET_PLAN_LIST]: PLANS_NORMALISERS.addPlans,
  },
  onSuccess: {},
  value: {},
};
