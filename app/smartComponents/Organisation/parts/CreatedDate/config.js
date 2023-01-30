import { getOrganisationCreatedDate } from 'datastore/orgStore/selectors';

export const CONFIG = {
  value: {
    createdDate: getOrganisationCreatedDate,
  },
  setValue: {},
};
