import { getPendingInvitations } from 'datastore/orgStore/selectors';

export const CONFIG = {
  value: {
    ids: getPendingInvitations,
  },
  setValue: {},
};
