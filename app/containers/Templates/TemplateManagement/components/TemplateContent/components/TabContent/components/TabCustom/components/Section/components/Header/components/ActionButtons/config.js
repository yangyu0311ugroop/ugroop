import { MOVE_NODE_AFTER, MOVE_NODE_BEFORE, NODE_API } from 'apis/constants';
import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';
import { MOVE_MODE } from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabCustom/constant';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG = {
  value: {
    moveMode: {
      keyPath: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'currentMode'],
      getter: currentMode => currentMode === MOVE_MODE,
    },
    createdBy: ({ id }) => NODE_STORE_SELECTORS.createdBy({ id }),
    content: ({ id }) => NODE_STORE_SELECTORS.content({ id }),
    editable: NODE_VIEW_STORE_SELECTORS.editable,
    type: RESAGA_HELPERS.mapToId(NODE_STORE_SELECTORS.type, 'tabId'),
  },
  setValue: {
    currentMode: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'currentMode'],
    editSections: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'editSections'],
    addChecklistParentId: [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'addChecklistParentId',
    ],
  },

  isLoading: {
    movingNodeBefore: [NODE_API, MOVE_NODE_BEFORE],
    movingNodeAfter: [NODE_API, MOVE_NODE_AFTER],
  },
};
