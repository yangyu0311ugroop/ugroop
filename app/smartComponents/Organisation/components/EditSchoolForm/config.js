import { SET_VALUE } from 'ugcomponents/SnackBar/config';
import {
  getOrganisationDetailsId,
  getOrganisationType,
} from '../../../../datastore/orgStore/selectors';

export const CONFIG = {
  value: {
    detailsId: getOrganisationDetailsId,
    type: getOrganisationType,
  },
  setValue: {
    ...SET_VALUE,
  },
};
