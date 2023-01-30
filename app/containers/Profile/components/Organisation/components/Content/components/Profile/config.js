import { RESAGA_HELPERS } from '../../../../../../../../utils/helpers/resaga';
import {
  getOrganisationName,
  getOrganisationType,
  getOrganisationLocationId,
} from '../../../../../../../../datastore/orgStore/selectors';

export const CONFIG = {
  value: {
    orgName: RESAGA_HELPERS.subscribeIfNotGiven(getOrganisationName, 'orgName'),
    orgType: RESAGA_HELPERS.subscribeIfNotGiven(getOrganisationType, 'orgType'),
    locationId: getOrganisationLocationId,
  },
  setValue: {},
};
