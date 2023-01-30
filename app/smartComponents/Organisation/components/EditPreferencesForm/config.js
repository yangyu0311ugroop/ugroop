import { SET_VALUE } from 'ugcomponents/SnackBar/config';
import { getOrganisationPreferenceId } from '../../../../datastore/orgStore/selectors';

export const CONFIG = {
  value: {
    preferenceId: getOrganisationPreferenceId,
  },
  setValue: {
    ...SET_VALUE,
  },
};
