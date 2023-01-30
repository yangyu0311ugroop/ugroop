import { getOrganisationTimezone } from 'datastore/orgStore/selectors';

export const CONFIG = {
  value: {
    timezone: getOrganisationTimezone,
  },
  setValue: {},
};
