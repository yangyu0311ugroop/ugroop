import {
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  TEMPLATE_MANAGEMENT_DATASTORE,
} from 'appConstants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { ORGANISATION_STORE_SELECTORS } from 'datastore/orgStore/selectors';
import { COGNITO_STORE_SELECTOR } from 'datastore/stormPathStore/selectors.resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

export const CONFIG_PARENT_ID = {
  value: {
    templateId: [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
  },
};
export const CONFIG_ORGANISATION_ID = {
  value: {
    orgIdNode: ({ templateId }) =>
      NODE_STORE_SELECTORS.organisationId({ id: templateId }),
    orgIdUrl: {
      getter: ORGANISATION_STORE_SELECTORS.organisationIdFromURL,
    },
    parentType: {
      cacheKey: ({ id }) => `parentType${id}`,
      keyPath: NODE_STORE_SELECTORS.parentType,
      getter: NODE_STORE_HELPERS.translateType,
    },
    myRootNodeId: COGNITO_STORE_SELECTOR.rootNodeId.value,
    organisationId: {
      getter: ({ orgIdUrl, orgIdNode }) => orgIdUrl || orgIdNode,
    },
  },
};
export const CONFIG = {
  value: {
    content: NODE_STORE_SELECTORS.content,
    description: NODE_STORE_SELECTORS.description,
    parentContent: NODE_STORE_SELECTORS.parentContent,
    orgRootNodeId: ({ organisationId }) =>
      ORGANISATION_STORE_SELECTORS.rootNodeId({
        id: organisationId,
      }),
    rootNodeId: {
      getter: ({ organisationId, myRootNodeId, orgRootNodeId }) =>
        LOGIC_HELPERS.ifElse(organisationId > 0, orgRootNodeId, myRootNodeId),
    },
    selectedChecklists: NODE_STORE_SELECTORS.selectedChecklists,
  },
  setValue: {
    checklists: NODE_STORE_SELECTORS.parentChecklists,
    editChecklistId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'editChecklistId'],
    addChecklistParentId: [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'addChecklistParentId',
    ],
    expandedChecklistId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'expandedChecklistId'],
    selectedChecklists: NODE_STORE_SELECTORS.selectedChecklists.keyPath,
  },
};
