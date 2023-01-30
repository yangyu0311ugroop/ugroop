import { getOrganisationCountry } from 'datastore/orgStore/selectors';

export const CONFIG = {
  value: {
    country: getOrganisationCountry,
  },
  setValue: {},
};
