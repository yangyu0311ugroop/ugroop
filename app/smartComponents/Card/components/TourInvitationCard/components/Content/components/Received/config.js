import {
  INVITATION_STORE,
  TEMPLATE_MANAGEMENT_DATASTORE,
  USER_DATA_STORE,
  COGNITO_ACCOUNTSTORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
} from 'appConstants';
import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { get } from 'lodash';

export const CONFIG = {
  value: {
    shareToUserId: props => INVITATION_STORE_SELECTORS.shareToUserId(props),
    shareFromUserId: props => INVITATION_STORE_SELECTORS.shareFromUserId(props),
    nodeId: props => INVITATION_STORE_SELECTORS.nodeId(props),
    status: props =>
      INVITATION_STORE_SELECTORS.sharedProp({ ...props, keyProp: 'status' }),
    role: props =>
      INVITATION_STORE_SELECTORS.sharedProp({ ...props, keyProp: 'role' }),
    content: props =>
      INVITATION_STORE_SELECTORS.sharedProp({
        ...props,
        keyProp: 'content',
      }), // TODO not yet implemented
    personalMessage: ({ token }) =>
      INVITATION_STORE_SELECTORS.content({ id: token }),
    organisationName: ({ token }) =>
      INVITATION_STORE_SELECTORS.contentOrgName({ id: token }),

    orgId: {
      keyPath: [
        props => INVITATION_STORE_SELECTORS.shareFromUserId(props),
        [USER_DATA_STORE, 'users'],
      ],
      getter: (shareFromUserId, users = {}) =>
        get(users, `${shareFromUserId}.orgId`),
    },
    target: {
      keyPath: [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
      getter: id => (id ? '_blank' : ''),
    },
    parentNodeId: [COGNITO_ACCOUNTSTORE, 'account', 'rootnodeid'],
    transferOrgId: props =>
      INVITATION_STORE_SELECTORS.sharedProp({ ...props, keyProp: 'orgid' }),
  },
  setValue: {
    exclusion: [INVITATION_STORE, 'exclusion'],
    refresh: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'refresh'],
  },
};
