import { getOrganisationLastSeen } from 'datastore/orgStore/selectors';

export const CONFIG = {
  value: {
    lastSeenDate: getOrganisationLastSeen,
  },
  setValue: {},
};
