import { getOrganisationFormat } from 'datastore/orgStore/selectors';

export const CONFIG = {
  value: {
    dateFormat: getOrganisationFormat,
  },
  setValue: {},
};
