import {
  CANCEL_INVITATION,
  DELETE_ORG_MEMBER,
  GET_ORG_MEMBERS,
  GET_ORG_SUBTYPES,
  GET_ORG_TYPES,
  GET_ORGANISATION,
  GET_OWN_ORG_INFO,
  GET_PERSON,
  GET_ORGANISATION_MEMBER_INFO,
  ORG_INVITATION,
  ORGANISATION_API,
  PATCH_ORG,
  RESEND_INVITATION,
  SETUP_PERSONAL_TOUR,
  SETUP_TOUR,
  SHARE_ORGANISATION,
  UPDATE_ORG_MEMBER,
  UPDATE_ORG_ROLE,
  ORG_SYNC,
  CREATE_ORGANISATION,
  BATCH_GET_ORG_MEMBERS,
} from 'apis/constants';
import {
  FILE_DATA_STORE,
  INVITATION_STORE,
  ORGANISATION_DATA_STORE,
  ORGANISATION_VIEWSTORE,
  USER_DATA_STORE,
  COGNITO_ACCOUNTSTORE,
  ABILITY_DATA_STORE,
} from 'appConstants';
import { requests } from 'utils/request';
import { helpers } from '../Invitation/config';
import { ORGANISATION_NORMALISERS } from './normalisers';

export const CONFIG = {
  name: ORGANISATION_API,
  requests: {
    [GET_OWN_ORG_INFO]: () =>
      requests.fetchWithAuthorisation('get', `/${ORGANISATION_API}/me`),
    [GET_ORG_TYPES]: () =>
      requests.fetchWithAuthorisation('get', `/${ORGANISATION_API}/orgTypes`),
    [PATCH_ORG]: ({ id, data }) =>
      requests.fetchWithAuthorisation(
        'patch',
        `/${ORGANISATION_API}/${id}`,
        data,
      ),
    [GET_ORG_MEMBERS]: ({ id, activated = true }) =>
      requests.fetchWithAuthorisation(
        'get',
        `/${ORGANISATION_API}/${id}/members/${activated}`,
      ),
    [BATCH_GET_ORG_MEMBERS]: ({ ids, activated = true }) =>
      Promise.all(
        ids.map(id =>
          requests.fetchWithAuthorisation(
            'get',
            `/${ORGANISATION_API}/${id}/members/${activated}`,
          ),
        ),
      ),
    [GET_ORGANISATION]: ({ id }) =>
      requests.fetchWithAuthorisation(
        'get',
        `/${ORGANISATION_API}/${id}/facade`,
      ),
    [GET_ORG_SUBTYPES]: ({ code }) =>
      requests.fetchWithAuthorisation(
        'get',
        `/${ORGANISATION_API}/orgTypes/${code}/subTypes`,
      ),
    [UPDATE_ORG_ROLE]: ({ id, userId, role }) =>
      requests.fetchWithAuthorisation(
        'patch',
        `/${ORGANISATION_API}/${id}/changeRole/${userId}`,
        { role },
      ),
    [UPDATE_ORG_MEMBER]: ({ id, userId, activated }) =>
      requests.fetchWithAuthorisation(
        'patch',
        `/${ORGANISATION_API}/${id}/members/${userId}`,
        { activated },
      ),
    [DELETE_ORG_MEMBER]: ({ id, userId }) =>
      requests.fetchWithAuthorisation(
        'delete',
        `/${ORGANISATION_API}/${id}/members/${userId}`,
      ),
    [GET_PERSON]: ({ email }) =>
      requests.fetchWithAuthorisation(
        'get',
        `/${ORGANISATION_API}/${email}/member`,
      ),
    [GET_ORGANISATION_MEMBER_INFO]: ({ id, email }) =>
      requests.fetchWithAuthorisation(
        'get',
        `/${ORGANISATION_API}/${id}/member/${email}`,
      ),
    [SHARE_ORGANISATION]: ({ id, payload }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${ORGANISATION_API}/${id}/userInvite`,
        payload,
      ),
    [RESEND_INVITATION]: ({ token, content }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${ORG_INVITATION}/${token}/resend`,
        { content },
      ),
    [SETUP_TOUR]: ({ id }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${ORGANISATION_API}/${id}/setupTour`,
      ),
    [SETUP_PERSONAL_TOUR]: ({ id, userId }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${ORGANISATION_API}/${id}/setupTour/${userId}`,
      ),
    [CANCEL_INVITATION]: ({ token, content }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${ORG_INVITATION}/${token}/cancel`,
        { content },
      ),
    [ORG_SYNC]: ({ id, data }) =>
      requests.fetchWithAuthorisation(
        'patch',
        `/${ORGANISATION_API}/${id}/firstTimeSetup`,
        data,
      ),
    [CREATE_ORGANISATION]: ({ data }) =>
      requests.fetchWithAuthorisation('post', `/${ORGANISATION_API}`, data),
  },
  onError: {
    [CANCEL_INVITATION]: [
      helpers.reveal(
        'Cancel invitation failed. Please reload the page and try again',
      ),
    ],
    [RESEND_INVITATION]: [
      helpers.reveal(
        'Resend invitation failed. Please reload the page and try again',
      ),
    ],
  },
  value: {
    organisationOwnerAbilities: [
      ABILITY_DATA_STORE,
      'definitions',
      'organisation',
      'owner',
    ],
  },
  setValue: {
    orgInfo: [ORGANISATION_DATA_STORE, 'orgInfo'],
    orgTypes: [ORGANISATION_DATA_STORE, 'orgTypes'],
    roles: [ORGANISATION_DATA_STORE, 'roles'],
    organisations: [ORGANISATION_DATA_STORE, 'organisations'],
    users: [USER_DATA_STORE, 'users'],
    organisationNode: [ORGANISATION_DATA_STORE, 'organisationNode'],
    files: [FILE_DATA_STORE, 'files'],
    locations: [ORGANISATION_DATA_STORE, 'locations'],
    preferences: [ORGANISATION_DATA_STORE, 'preferences'],
    details: [ORGANISATION_DATA_STORE, 'details'],
    photos: [ORGANISATION_DATA_STORE, 'photos'],
    subTypes: [ORGANISATION_DATA_STORE, 'subTypes'],
    members: [ORGANISATION_DATA_STORE, 'members'],
    shares: [ORGANISATION_DATA_STORE, 'shares'],
    organisationShares: [INVITATION_STORE, 'organisationShares'],
    inviteeId: [ORGANISATION_VIEWSTORE, 'inviteeId'],
    inviteeToken: [ORGANISATION_VIEWSTORE, 'inviteeToken'],
    inviteeOrgId: [ORGANISATION_VIEWSTORE, 'inviteeOrgId'],
    people: [USER_DATA_STORE, 'people'],
    orgUsers: [ORGANISATION_DATA_STORE, 'orgUsers'],
    accountRelatedOrgs: [COGNITO_ACCOUNTSTORE, 'accountRelatedOrgs'],
    // pending: [ORGANISATION_DATA_STORE, 'shares', id, 'pending'],
    organisationAbilities: [ABILITY_DATA_STORE, 'organisation'],
    connectedMembers: [ORGANISATION_DATA_STORE, 'connectedMembers'],
  },

  processResult: {
    [GET_OWN_ORG_INFO]: orgInfo => ({ orgInfo }),
    [GET_ORG_TYPES]: orgTypes => ({ orgTypes }),
    [GET_ORGANISATION]: ORGANISATION_NORMALISERS.addOrganisation,
    [PATCH_ORG]: ORGANISATION_NORMALISERS.updateOrganisation,
    [GET_ORG_MEMBERS]: ORGANISATION_NORMALISERS.addRoles,
    [BATCH_GET_ORG_MEMBERS]: ORGANISATION_NORMALISERS.batchAddRoles,
    [GET_ORG_SUBTYPES]: subTypes => ({ subTypes }),
    [UPDATE_ORG_ROLE]: ORGANISATION_NORMALISERS.updateRoles,
    [UPDATE_ORG_MEMBER]: ORGANISATION_NORMALISERS.updateMembers,
    [DELETE_ORG_MEMBER]: ORGANISATION_NORMALISERS.removeMember,
    [GET_PERSON]: ORGANISATION_NORMALISERS.normaliseGetPerson,
    [SHARE_ORGANISATION]: ORGANISATION_NORMALISERS.updateShares,
    [SETUP_TOUR]: ORGANISATION_NORMALISERS.setupTour,
    [CANCEL_INVITATION]: ORGANISATION_NORMALISERS.normaliseInvitationAction,
    [CREATE_ORGANISATION]: ORGANISATION_NORMALISERS.normaliseCreateOrganisation,
  },

  manuallySubscribe: true, // will not auto-subscribe to all values in `@@values`
};
