import { TEMPLATE_MANAGEMENT_DATASTORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const TEMPLATE_ID_CONFIG = {
  value: {
    templateId: [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
  },
};

export const CONFIG = {
  value: {
    timelineId: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedTimelineId({ id: templateId }),
    visibleChildren: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedVisibleChildren({ id: templateId }),
    ids: NODE_STORE_SELECTORS.children,
    content: NODE_STORE_SELECTORS.content,
    type: NODE_STORE_SELECTORS.type,
    subtype: NODE_STORE_SELECTORS.subtype,
    calculatedPeopleCount: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.calculatedPeopleCount,
      'templateId',
    ),
    isPrivate: NODE_STORE_SELECTORS.isPrivate,
    layout: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedLayout({ id: templateId }),
    sharedWith: NODE_STORE_SELECTORS.sharedWith,
  },
  setValue: {
    layout: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedLayout({ id: templateId }),
  },
};
