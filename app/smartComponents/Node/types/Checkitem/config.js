import {
  DELETE_CHILDREN,
  NODE_API,
  INSERT_AFTER,
  INSERT_BEFORE,
  CREATE_NEXT_NODE,
} from 'apis/constants';
import {
  COGNITO_ACCOUNTSTORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
} from 'appConstants';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';

export const CONFIG = {
  value: {
    me: [COGNITO_ACCOUNTSTORE, 'account', 'id'],

    status: NODE_STORE_SELECTORS.status,
    dueDate: NODE_STORE_SELECTORS.dueDate,
    description: NODE_STORE_SELECTORS.description,
    completedBy: NODE_STORE_SELECTORS.completedBy,
    notes: NODE_STORE_SELECTORS.notes,
    createdBy: NODE_STORE_SELECTORS.createdBy,
    parentId: NODE_STORE_SELECTORS.parentId,
    lastNodeId: NODE_STORE_SELECTORS.lastNodeId,
    insertLocation: NODE_STORE_SELECTORS.insertLocation,
    editingCheckItem: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'editingCheckItem'],
  },
};

export const CHECKITEMS_CONFIG = {
  value: {
    checkitems: ({ parentNodeId }) =>
      NODE_STORE_SELECTORS.checklists({ id: parentNodeId }),
    editable: NODE_VIEW_STORE_SELECTORS.editable,
  },
  setValue: {
    node: NODE_STORE_SELECTORS.node,

    seeDetail: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'seeCheckItemDetail'],
    seeCheckItemParentId: [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'seeCheckItemParentId',
    ],
    ...PORTAL_HELPERS.setValue,
  },

  isLoading: {
    deleting: [NODE_API, DELETE_CHILDREN],
    creating: {
      keyPath: [
        [NODE_API, INSERT_AFTER],
        [NODE_API, INSERT_BEFORE],
        [NODE_API, CREATE_NEXT_NODE],
      ],
      getter: (insertAfter, insertBefore, InserNext) =>
        insertAfter || insertBefore || InserNext,
    },
  },
};
