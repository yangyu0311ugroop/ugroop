import { getMemberFullName } from 'datastore/orgStore/selectors';

export const CONFIG = {
  value: {
    fullName: getMemberFullName,
  },
  setValue: {},
};
