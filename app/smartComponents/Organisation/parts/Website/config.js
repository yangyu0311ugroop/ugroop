import { getOrganisationWebsite } from 'datastore/orgStore/selectors';

export const CONFIG = {
  value: {
    website: getOrganisationWebsite,
  },
  setValue: {},
};
