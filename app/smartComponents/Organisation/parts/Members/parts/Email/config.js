import { getMemberEmail } from 'datastore/orgStore/selectors';

export const CONFIG = {
  value: {
    email: getMemberEmail,
  },
  setValue: {},
};
