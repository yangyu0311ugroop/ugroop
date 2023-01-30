import {
  INVITATION_STORE,
  TEMPLATE_MANAGEMENT_DATASTORE,
  USER_DATA_STORE,
} from 'appConstants';
import { get } from 'lodash';

export const CONFIG = {
  value: {
    shareToUserId: ({ token }) => [
      INVITATION_STORE,
      'shares',
      token,
      'shareToUserId',
    ],
    shareFromUserId: ({ token }) => [
      INVITATION_STORE,
      'shares',
      token,
      'shareFrom',
    ],
    nodeOrgId: ({ token }) => [INVITATION_STORE, 'shares', token, 'orgId'],
    nodeOrgName: ({ token }) => [INVITATION_STORE, 'shares', token, 'orgName'],
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
        ({ token }) => [INVITATION_STORE, 'shares', token, 'shareFrom'],
        [USER_DATA_STORE, 'users'],
      ],
      getter: (shareFromUserId, users = {}) =>
        get(users, `${shareFromUserId}.orgId`),
    },
    target: {
      keyPath: [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
      getter: id => (id ? '_blank' : ''),
    },
  },
  setValue: {
    exclusion: [INVITATION_STORE, 'exclusion'],
  },
};
