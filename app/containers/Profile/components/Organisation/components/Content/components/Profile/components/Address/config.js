import { getOrganisationPlaceId } from 'datastore/orgStore/selectors';

export const CONFIG = {
  value: {
    placeId: ({ locationId }) => getOrganisationPlaceId({ id: locationId }),
  },
  setValue: {},
};
