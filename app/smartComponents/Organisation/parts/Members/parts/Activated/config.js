import { getActivated } from 'datastore/orgStore/selectors';

export const CONFIG = {
  value: {
    activated: getActivated,
  },
  setValue: {},
};
