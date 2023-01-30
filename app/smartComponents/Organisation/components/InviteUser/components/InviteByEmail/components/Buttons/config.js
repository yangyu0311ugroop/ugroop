import {
  GET_PERSON,
  ORGANISATION_API,
  SHARE_ORGANISATION,
} from 'apis/constants';
import {
  CONFIRMED,
  INVITATION_STORE,
  PENDING,
  ORGANISATION_DATA_STORE,
  ORGANISATION_VIEWSTORE,
} from 'appConstants';

export const CONFIG = {
  value: {
    exist: {
      keyPath: [ORGANISATION_VIEWSTORE, 'inviteeEmail'],
      getter: inviteeEmail => !!inviteeEmail,
    },
    owner: ({ id }) => [
      ORGANISATION_DATA_STORE,
      'organisations',
      id,
      'createdBy',
    ],
    status: {
      keyPath: ({ inviteeToken }) => [
        INVITATION_STORE,
        'organisationShares',
        inviteeToken,
        'status',
      ],
      getter: (status, { inviteeToken }) => ({
        pending: status === PENDING,
        accepted: status === CONFIRMED && inviteeToken !== '',
      }),
      spreadObject: true,
    },
  },
  setValue: {},

  isLoading: {
    fetching: [ORGANISATION_API, GET_PERSON],
    sending: [ORGANISATION_API, SHARE_ORGANISATION],
  },
};
