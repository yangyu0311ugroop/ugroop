import { NODE_API, SHARE_NODE, USER_API } from 'apis/constants';
import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';

export const CONFIG = {
  value: {
    userId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'inviteeId'],
    email: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'inviteeEmail'],
  },
  setValue: {
    inviteeId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'inviteeId'],
    inviteeToken: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'inviteeToken'],
    inviteeEmail: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'inviteeEmail'],
    invitationMode: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.invitationMode,
    nodeShareSuccess: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'nodeShareSuccessData'],
    addRoleSuccess: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'addRoleSuccessData'],
  },

  isLoading: {
    fetching: [USER_API],
    sending: [NODE_API, SHARE_NODE],
  },
};
