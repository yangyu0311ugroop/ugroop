import { USER_DATA_STORE } from 'appConstants';
import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { get } from 'lodash';

export const CONFIG = {
  value: {
    shareTo: props => INVITATION_STORE_SELECTORS.shareTo(props),
    shareToUserId: props => INVITATION_STORE_SELECTORS.shareToUserId(props),
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
        props => INVITATION_STORE_SELECTORS.shareToUserId(props),
        [USER_DATA_STORE, 'users'],
      ],
      getter: (shareToUserId, users = {}) =>
        get(users, `${shareToUserId}.orgId`),
    },
  },
  setValue: {},
};
