import { TEMPLATE_MANAGEMENT_VIEWSTORE, NODE_STORE } from 'appConstants';
import { TEMPLATE_MANAGEMENT_STORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { EVENT_STORE_VIEW_SELECTORS } from 'datastore/eventStore/selectors';
import { COMMENT } from 'containers/Templates/TemplateManagement/components/Comment/config';
import { SET_VALUE } from 'ugcomponents/SnackBar/config';

export const DAYS = 'nodes';
export const CONFIG = {
  setValue: {
    nodeId: [COMMENT, 'nodeId'],
    nodeStore: [COMMENT, 'nodeStore'],
    nodeData: [COMMENT, 'nodeData'],
    sections: [NODE_STORE, 'nodes'],
    days: [NODE_STORE, 'nodes'],
    eventCreate: EVENT_STORE_VIEW_SELECTORS.eventCreate,
    addChecklistParentId: [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'addChecklistParentId',
    ],
    ...SET_VALUE,
  },
  value: {
    tabId: TEMPLATE_MANAGEMENT_STORE_SELECTORS.tabId,
  },
};
