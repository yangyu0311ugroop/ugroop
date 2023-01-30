import {
  CONFIRMED,
  INVITATION_STORE,
  PENDING,
  COGNITO_ACCOUNTSTORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  ORGANISATION_VIEWSTORE,
} from 'appConstants';

export const CONFIG = {
  value: {
    email: {
      keyPath: ({ token }) => [
        INVITATION_STORE,
        'organisationShares',
        token,
        'inviteTo',
      ],
      getter: (inviteTo, { email }) => email || inviteTo,
    },
    userId: {
      keyPath: ({ token }) => [
        INVITATION_STORE,
        'organisationShares',
        token,
        'inviteToUserId',
      ],
      getter: (inviteToUserId, { ownerId, userId }) =>
        ownerId || userId || inviteToUserId,
    },

    content: ({ token }) => [
      INVITATION_STORE,
      'organisationShares',
      token,
      'content',
    ],

    status: {
      keyPath: ({ token }) => [
        INVITATION_STORE,
        'organisationShares',
        token,
        'status',
      ],
      getter: (status, { ownerId, pending, accepted }) => {
        if (ownerId) return { accepted: true };

        return {
          pending: pending || status === PENDING,
          accepted: accepted || status === CONFIRMED,
        };
      },
      spreadObject: true,
    },
    me: [COGNITO_ACCOUNTSTORE, 'account', 'id'],
  },

  setValue: {
    seeDetail: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'seeDetail'],
    fromOrg: [ORGANISATION_VIEWSTORE, 'fromOrg'],
  },
};
