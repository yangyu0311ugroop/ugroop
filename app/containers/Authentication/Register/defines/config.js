import { USER_API, CREATE_ORG_USER } from 'apis/constants';
import { NOTIFICATION_DATASTORE } from 'appConstants';
import { get } from 'lodash';

export const CONFIG = {
  value: {
    notifications: {
      keyPath: ({ match }) => [
        NOTIFICATION_DATASTORE,
        'notifications',
        get(match, 'params.token'),
        'remoteContent',
      ],
      spreadObject: true,
    },
    token: {
      getter: ({ match }) => get(match, 'params.token'),
    },
    isRegisterByTourInvitation: {
      getter: ({ shareTo, senderEmail, transferTo }) =>
        !!((shareTo || transferTo) && senderEmail),
    },
    isRegisterByOrgInvitation: {
      getter: ({
        shareTo,
        senderEmail,
        organisationName,
        inviteToOrganisation,
      }) =>
        !!(shareTo && senderEmail && organisationName && inviteToOrganisation),
    },
    shareTo: {
      getter: ({ shareTo, transferTo }) => shareTo || transferTo,
    },
  },

  isLoading: {
    isLoading: [USER_API, CREATE_ORG_USER],
  },
};
