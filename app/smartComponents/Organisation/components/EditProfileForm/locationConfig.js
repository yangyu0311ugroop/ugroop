import {
  getOrganisationTimezone,
  getOrganisationPlaceId,
} from 'datastore/orgStore/selectors';
import { SET_VALUE } from 'ugcomponents/SnackBar/config';
export const LOCATION_CONFIG = {
  value: {
    placeId: props => getOrganisationPlaceId({ id: props.locationId }),
    timezone: props => getOrganisationTimezone({ id: props.preferenceId }),
  },
  setValue: {
    ...SET_VALUE,
  },
};
