import {
  getOrganisationLocationId,
  getOrganisationPreferenceId,
} from 'datastore/orgStore/selectors';
export const CONFIG = {
  value: {
    locationId: getOrganisationLocationId,
    preferenceId: getOrganisationPreferenceId,
  },
  setValue: {},
};
