import { COGNITO_ACCOUNTSTORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS as VIEW } from 'datastore/templateManagementStore/selectors';

export const CONFIG = {
  value: {
    transferByType: VIEW.TRANSFER_NODE.transferByType,
    transferToUserId: NODE_STORE_SELECTORS.nodeTransferToUserId,
    transferToEmail: NODE_STORE_SELECTORS.nodeTransferTo,
    orgId: NODE_STORE_SELECTORS.organisationId,
    me: [COGNITO_ACCOUNTSTORE, 'account', 'id'],
    transferStatus: NODE_STORE_SELECTORS.nodeTransferStatus,
  },
};

export const CONFIG_2 = {
  value: {
    memberEmail: ({ transferToUserId: id }) =>
      USER_STORE_SELECTORS.email({ id }),
  },
  setValue: {
    transferByType: VIEW.TRANSFER_NODE.transferByType,
    transferToUserId: NODE_STORE_SELECTORS.nodeTransferToUserId,
    transferToEmail: NODE_STORE_SELECTORS.nodeTransferTo,
  },
};
