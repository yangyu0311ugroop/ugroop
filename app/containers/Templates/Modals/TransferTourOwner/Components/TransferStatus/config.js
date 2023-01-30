import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import {
  COGNITO_ACCOUNTSTORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
} from 'appConstants';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';

export const CONFIG = {
  value: {
    createdBy: NODE_STORE_SELECTORS.createdBy,
    transferStatus: NODE_STORE_SELECTORS.nodeTransferStatus,
    tranferTo: NODE_STORE_SELECTORS.nodeTransferToUserId,
    nodeTransferToken: NODE_STORE_SELECTORS.nodeTransferToken,
    me: RESAGA_HELPERS.subscribeIfNotGiven(
      [COGNITO_ACCOUNTSTORE, 'account', 'id'],
      'me',
    ),
  },
};
export const CONFIG2 = {
  value: {
    orgUserIds: ({ me }) => USER_STORE_SELECTORS.orgUsers({ id: me }),
  },
  setValue: {
    ...PORTAL_HELPERS.setValue,
    transferDialog: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'transferDialog'],
  },
};
