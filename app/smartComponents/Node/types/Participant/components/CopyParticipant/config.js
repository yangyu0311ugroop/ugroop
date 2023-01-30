import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from '../../../../../../datastore/templateManagementStore/selectors';

export const CONFIG = {
  value: {},
  setValue: {
    createLinkFollowerDialogOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.createLinkFollowerDialogOpen,
    ...PORTAL_HELPERS.setValue,
  },
};
