import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_STORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG_0 = {
  value: {
    templateId: TEMPLATE_MANAGEMENT_STORE_SELECTORS.templateId,
  },
};

export const CONFIG = {
  value: {
    calculatedVisibleChildren: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.calculatedVisibleChildren,
      'templateId',
    ),
    calculatedPeopleTabId: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.calculatedPeopleTabId,
      'templateId',
    ),
    ownerId: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.createdBy,
      'templateId',
    ),
  },
  setValue: {},
};
