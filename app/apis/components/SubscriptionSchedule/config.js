import {
  LIST_SUBSCRIPTION_SCHEDULE,
  SUBSCRIPTION_SCHEDULE_API,
  RELEASE_SUBSCRIPTION_SCHEDULE,
  CREATE_SUBSCRIPTION_SCHEDULE,
  UPDATE_SUBSCRIPTION_SCHEDULE,
} from 'apis/constants';
import { requests } from 'utils/request';
import { SUBSCRIPTION_SCHEDULE_NORMALISERS } from './normalisers';

export const CONFIG = {
  name: SUBSCRIPTION_SCHEDULE_API,
  requests: {
    [LIST_SUBSCRIPTION_SCHEDULE]: ({ query }) =>
      requests.fetchWithAuthorisation(
        'get',
        `/${SUBSCRIPTION_SCHEDULE_API}?listOptions=${query}`,
      ),
    [RELEASE_SUBSCRIPTION_SCHEDULE]: ({ scheduleId }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${SUBSCRIPTION_SCHEDULE_API}/${scheduleId}/release`,
      ),
    [CREATE_SUBSCRIPTION_SCHEDULE]: ({ data }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${SUBSCRIPTION_SCHEDULE_API}`,
        data,
      ),
    [UPDATE_SUBSCRIPTION_SCHEDULE]: ({ scheduleId, data }) =>
      requests.fetchWithAuthorisation(
        'patch',
        `/${SUBSCRIPTION_SCHEDULE_API}/${scheduleId}`,
        data,
      ),
  },
  processResult: {
    [LIST_SUBSCRIPTION_SCHEDULE]:
      SUBSCRIPTION_SCHEDULE_NORMALISERS.upsertSchedules,
    [UPDATE_SUBSCRIPTION_SCHEDULE]:
      SUBSCRIPTION_SCHEDULE_NORMALISERS.upsertSchedule,
    [RELEASE_SUBSCRIPTION_SCHEDULE]:
      SUBSCRIPTION_SCHEDULE_NORMALISERS.removeSchedule,
  },
  onSuccess: {},
  value: {},
  setValue: {},
};
