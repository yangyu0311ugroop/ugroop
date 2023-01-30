import {
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  NODE_STORE,
  COGNITO_ACCOUNTSTORE,
} from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';

export const PARENT_CONFIG = {
  value: {
    expandedChecklistId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'expandedChecklistId'],
    showClosed: ({ parentNodeId }) => [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'checklists',
      parentNodeId,
      'showClosed',
    ],
  },
};

export const CONFIG = {
  value: {
    checklists: NODE_STORE_SELECTORS.parentChecklists,
    parentParentNodeId: NODE_STORE_SELECTORS.parentParentNodeId,
    editingCheckItem: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'editingCheckItem'],
    createdBy: ({ expandedChecklistId: id }) =>
      NODE_STORE_SELECTORS.createdBy({ id }),
    me: [COGNITO_ACCOUNTSTORE, 'account', 'id'],
    type: ({ parentNodeId }) => NODE_STORE_SELECTORS.type({ id: parentNodeId }),
    selectedChecklists: NODE_STORE_SELECTORS.selectedChecklists,
    expandedParentChecklistId: [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'expandedParentChecklistId',
    ],
  },
};

export const CHECKITEMS_CONFIG = {
  value: {
    checkItems: {
      keyPath: ({ checklists }) =>
        checklists
          ? checklists.map(checklist =>
              NODE_STORE_SELECTORS.parentChecklists({
                parentNodeId: checklist,
              }),
            )
          : {},
      cacheKey: ({ checklists }) =>
        `templateManagementPage.checkitems.${
          checklists ? checklists.toString() : null
        }.checkitems`,
      props: null,
      getter: (...checkitems) => checkitems.filter(item => item),
    },
    remainingChecklist: NODE_STORE_SELECTORS.filterByStatuses({
      ids: 'checklists',
      statuses: ['open'],
    }),
    overviewLayout: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedOverviewType'],
  },
  setValue: {
    addChecklistParentId: [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'addChecklistParentId',
    ],
    nodes: [NODE_STORE, 'nodes'],
    expandedChecklistId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'expandedChecklistId'],
    expandedParentChecklistId: [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'expandedParentChecklistId',
    ],
    showClosed: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'checklists'],
    ...PORTAL_HELPERS.setValue,
  },
};
