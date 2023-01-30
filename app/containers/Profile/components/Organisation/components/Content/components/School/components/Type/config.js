import {
  getOrganisationDetailsId,
  getOrganisationType,
} from 'datastore/orgStore/selectors';

export const CONFIG = {
  value: {
    detailsId: getOrganisationDetailsId,
    type: getOrganisationType,
  },
  setValue: {},
};
