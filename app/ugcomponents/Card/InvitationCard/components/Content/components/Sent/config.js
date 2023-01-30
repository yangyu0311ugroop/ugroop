import { INVITATION_STORE, USER_DATA_STORE } from 'appConstants';
import { get } from 'lodash';

export const CONFIG = {
  value: {
    shareTo: ({ token }) => [INVITATION_STORE, 'shares', token, 'shareTo'],
    shareToUserId: ({ token }) => [
      INVITATION_STORE,
      'shares',
      token,
      'shareToUserId',
    ],
    nodeId: ({ token }) => [INVITATION_STORE, 'shares', token, 'nodeId'],
    status: ({ token }) => [INVITATION_STORE, 'shares', token, 'status'],
    role: ({ token }) => [INVITATION_STORE, 'shares', token, 'role'],
    content: ({ token }) => [INVITATION_STORE, 'shares', token, 'content'], // TODO not yet implemented
    personalMessage: ({ token }) => [
      INVITATION_STORE,
      'notifications',
      token,
      'content',
      'content',
    ],
    organisationName: ({ token }) => [
      INVITATION_STORE,
      'notifications',
      token,
      'content',
      'organisationName',
    ],

    orgId: {
      keyPath: [
        ({ token }) => [INVITATION_STORE, 'shares', token, 'shareToUserId'],
        [USER_DATA_STORE, 'users'],
      ],
      getter: (shareToUserId, users = {}) =>
        get(users, `${shareToUserId}.orgId`),
    },
  },
  setValue: {},
};
