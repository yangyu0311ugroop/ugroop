import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS as VIEW } from 'datastore/templateManagementStore/selectors';
import { getPeopleIds } from 'datastore/orgStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { COGNITO_STORE_SELECTOR } from 'datastore/stormPathStore/selectors.resaga';
export const CONFIG = {
  value: {
    transferByType: VIEW.TRANSFER_NODE.transferByType,
    peopleIds: ({ orgId }) => getPeopleIds({ id: orgId }),
    transferToUserId: NODE_STORE_SELECTORS.nodeTransferToUserId,
    me: COGNITO_STORE_SELECTOR.userId.value,
    createdBy: NODE_STORE_SELECTORS.createdBy,
  },
  setValue: {
    transferByType: VIEW.TRANSFER_NODE.transferByType,
    transferToUserId: NODE_STORE_SELECTORS.nodeTransferToUserId,
  },
};
