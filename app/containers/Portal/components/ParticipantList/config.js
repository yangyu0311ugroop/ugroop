import { SET_VALUE } from 'ugcomponents/SnackBar/config';
import { PORTAL_HELPERS } from '../../helpers';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from '../../../../datastore/templateManagementStore/selectors';
export const CONFIG = {
  setValue: {
    participantViewOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.open,
    participantViewId:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.PARTICIPANT.VIEW.id,
    ...PORTAL_HELPERS.setValue,
    ...SET_VALUE,
  },
};
