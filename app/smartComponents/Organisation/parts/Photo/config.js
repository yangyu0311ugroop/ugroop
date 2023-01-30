import { getOrganisationPhotoUrl } from 'datastore/orgStore/selectors';

export const CONFIG = {
  value: {
    photo: getOrganisationPhotoUrl,
  },
};
