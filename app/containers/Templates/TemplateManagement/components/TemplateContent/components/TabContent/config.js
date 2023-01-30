import { GET_TEMPLATE_TAB_DETAIL, TEMPLATE_TAB_API } from 'apis/constants';
import {
  COGNITO_ACCOUNTSTORE,
  TEMPLATE_MANAGEMENT_DATASTORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
} from 'appConstants';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';
/**
 * Created by quando on 18/8/17.
 */
import { revealSnackbar } from 'ugcomponents/SnackBar/actions';

export const snackbar = { reveal: revealSnackbar };

export const TAB_CONTENT = 'tabContent';
export const CREATE_NEXT_NODE = 'createNext';
export const CREATE_CHILD_NODE = 'createChild';
export const UPDATE_NODE = 'updateNode';
export const INSERT_BEFORE = 'insertBefore';
export const INSERT_AFTER = 'insertAfter';
export const MOVE_NODE_BEFORE = 'moveNodeBefore';
export const MOVE_NODE_AFTER = 'moveNodeAfter';
export const IS_MOVING = 'isMoving';
export const MOVE_BEFORE = 'moveBefore';
export const MOVE_AFTER = 'moveAfter';
export const BATCH_MOVE = 'batchMove';
export const BATCH_DELETE = 'batchDelete';
// TODO: if there are more sub-level node types, they should be listed here.
export const subTypes = ['activity'];
export const UPDATE_NODEIMAGE = 'updateNodeImage';
export const INSERT_NODEIMAGE = 'insertNodeImage';
export const UPLOAD_ORIGINAL_IMAGE = 'uploadOriginalImage';

export const CONFIG = {
  value: {
    type: ({ tabId }) => NODE_STORE_SELECTORS.type({ id: tabId }),
    ids: ({ templateId }) => NODE_STORE_SELECTORS.children({ id: templateId }),
    layout: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedLayout({ id: templateId }),
    displayDate: ({ templateId }) =>
      NODE_STORE_SELECTORS.displayDate({ id: templateId }),
    shareDialog: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'shareDialog'],
    userId: [COGNITO_ACCOUNTSTORE, 'account', 'id'],
    userEmail: [COGNITO_ACCOUNTSTORE, 'account', 'email'],
  },
  // new config, to remotely setValue to a redux store
  setValue: {
    tabId: [TEMPLATE_MANAGEMENT_DATASTORE, 'tabId'],
    shareDialog: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'shareDialog'],
    layoutRecheck: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedLayoutRecheck({ id: templateId }),
    templates: [TEMPLATE_MANAGEMENT_DATASTORE, 'templates'],
    editable: NODE_VIEW_STORE_SELECTORS.editable,
    ...PORTAL_HELPERS.setValue,
  },

  isLoading: {
    isFetching: [TEMPLATE_TAB_API, GET_TEMPLATE_TAB_DETAIL],
  },
};
