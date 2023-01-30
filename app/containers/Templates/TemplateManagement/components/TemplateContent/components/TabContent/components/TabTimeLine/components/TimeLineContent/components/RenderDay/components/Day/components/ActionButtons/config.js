import {
  NODE_STORE,
  TEMPLATE_MANAGEMENT_DATASTORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
} from 'appConstants';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { COMMENT } from 'containers/Templates/TemplateManagement/components/Comment/config';
import commonAttribute from 'containers/Templates/TemplateManagement/defines/commonAttribute';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_VIEW_SELECTORS } from 'datastore/eventStore/selectors';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';
import { SET_VALUE } from 'ugcomponents/SnackBar/config';

export const TEMPLATE_ID_CONFIG = {
  value: {
    templateId: [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
  },
};

export const CONFIG = {
  value: {
    startDate: ({ templateId }) =>
      NODE_STORE_SELECTORS.startDate({ id: templateId }),
    displayDate: ({ templateId }) =>
      NODE_STORE_SELECTORS.displayDate({ id: templateId }),
    weekDay: ({ templateId }) =>
      NODE_STORE_SELECTORS.weekDay({ id: templateId }),
    title: NODE_STORE_SELECTORS.content,
    activityIds: NODE_STORE_SELECTORS.children,
    dateTitle: commonAttribute.formatDate,
    editable: NODE_VIEW_STORE_SELECTORS.editable,
    editing: NODE_STORE_SELECTORS.editing,
    firstChild: ({ tabId }) => NODE_STORE_SELECTORS.child(0)({ id: tabId }),
    nextSelectedId: ({ tabId, index }) => [
      NODE_STORE,
      'nodes',
      tabId,
      'children',
      index,
    ],
    prevSelectedId: ({ tabId, index }) => [
      NODE_STORE,
      'nodes',
      tabId,
      'children',
      index - 2,
    ],
  },
  setValue: {
    nodeId: [COMMENT, 'nodeId'],
    nodeStore: [COMMENT, 'nodeStore'],
    nodeData: [COMMENT, 'nodeData'],
    addChecklistParentId: [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'addChecklistParentId',
    ],
    selectedId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedId'],
    eventCreate: EVENT_STORE_VIEW_SELECTORS.eventCreate,
    formType: EVENT_STORE_VIEW_SELECTORS.eventFormProp({
      path: EVENT_PATHS.type,
    }),
    formSubtype: EVENT_STORE_VIEW_SELECTORS.eventFormProp({
      path: EVENT_PATHS.subtype,
    }),
    editing: NODE_STORE_SELECTORS.editing,
    ...SET_VALUE,
    ...PORTAL_HELPERS.setValue,
  },
};
