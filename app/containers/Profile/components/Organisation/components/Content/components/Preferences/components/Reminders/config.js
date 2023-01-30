import { getOrganisationPreferenceId } from 'datastore/orgStore/selectors';

export const CONFIG = {
  value: {
    preferenceId: getOrganisationPreferenceId,
  },
  setValue: {},
};
