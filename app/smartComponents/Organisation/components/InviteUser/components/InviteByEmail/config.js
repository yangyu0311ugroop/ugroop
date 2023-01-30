import {
  GET_PERSON,
  ORGANISATION_API,
  SHARE_ORGANISATION,
} from 'apis/constants';
import { ORGANISATION_VIEWSTORE } from 'appConstants';

export const CONFIG = {
  value: {
    userId: [ORGANISATION_VIEWSTORE, 'inviteeId'],
    email: [ORGANISATION_VIEWSTORE, 'inviteeEmail'],
    inviteeOrgId: [ORGANISATION_VIEWSTORE, 'inviteeOrgId'],
  },
  setValue: {
    inviteeId: [ORGANISATION_VIEWSTORE, 'inviteeId'],
    inviteeToken: [ORGANISATION_VIEWSTORE, 'inviteeToken'],
    inviteeEmail: [ORGANISATION_VIEWSTORE, 'inviteeEmail'],
    inviteeOrgId: [ORGANISATION_VIEWSTORE, 'inviteeOrgId'],
  },

  isLoading: {
    fetching: [ORGANISATION_API, GET_PERSON],
    sending: [ORGANISATION_API, SHARE_ORGANISATION],
  },
};
