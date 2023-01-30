// import { ORG_STORE_SELECTORS } from 'datastore/orgStore/selectors';
import {
  getOrganisationAddress,
  getOrganisationPlaceId,
} from 'datastore/orgStore/selectors';
export const CONFIG = {
  value: {
    address: getOrganisationAddress,
    placeId: getOrganisationPlaceId,
  },
  setValue: {},
};
