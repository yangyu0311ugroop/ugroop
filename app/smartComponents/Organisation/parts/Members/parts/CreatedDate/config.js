import { getMemberCreatedDate } from 'datastore/orgStore/selectors';

export const CONFIG = {
  value: {
    createdDate: getMemberCreatedDate,
  },
  setValue: {},
};
