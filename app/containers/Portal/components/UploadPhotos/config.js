import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_STORE_SELECTORS } from '../../../../datastore/templateManagementStore/selectors';

export const CONFIG = {
  value: {
    tourId: TEMPLATE_MANAGEMENT_STORE_SELECTORS.templateId,
    galleryContent: NODE_STORE_SELECTORS.content,
  },
  setValue: {
    ...PORTAL_HELPERS.setValue,
  },
};
