import { FILE_STORE_SELECTORS } from 'datastore/fileStore/selectors';
import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { COGNITO_STORE_SELECTOR } from 'datastore/stormPathStore/selectors.resaga';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { truncate, get } from 'lodash';
import {
  INVITATION_STORE,
  NODE_STORE,
  ORGANISATION_DATA_STORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  COORDINATE_DATA_STORE,
  USER_DATA_STORE,
  DASHBOARD_VIEW_STORE,
  COGNITO_ACCOUNTSTORE,
} from 'appConstants';
import { BOTH, PENDING } from 'datastore/invitationStore/constants';
import { requests } from 'utils/request';
import { AwsApi } from 'utils/cognito';
import {
  USER_API,
  CREATE_ORG_USER,
  SIGN_IN,
  SIGN_OUT,
  FORGET_PWD,
  RESET_PWD,
  CHANGE_PWD,
  GET_INVITATIONS,
  GET_ORGANISATION_INVITATIONS,
  GET_ROLES,
  GET_RECENT_ACTIVITY,
  ME,
  PERSON_SYNC,
  RESEND_SIGNUP,
  HIDE_RECENT_ACTIVITY,
  CREATE_USER_VIA_INVITE,
  CREATE_PERSONAL_REGISTRATION,
  REGISTER_DEVICE,
  UNREGISTER_DEVICE,
  GET_USER_PREFERENCE,
  UPDATE_USER_PREFERENCE,
  GET_USER_RELATED_TEMPLATES,
  GET_USER_NODE,
  GET_TRANSFER_NODE_LIST,
  GET_PERSONAL_PREFERENCES,
  UPSERT_PERSONAL_PREFERENCES,
} from 'apis/constants';
import helpers from 'datastore/userStore/helpers';
import recentActivityStoreHelper from 'datastore/coordinateDataStore/index';
import { USER_APIS_UTILS } from './utils';
import {
  isEmptyString,
  truncateAndToLowerCase,
} from '../../../utils/stringAdditions';
import defineMessages from '../../../utils/validationrule';
import { NODE_STORE_SELECTORS } from '../../../datastore/nodeStore/selectors';

/**
 *  The way how to generate Org Key.
 ** org-{ORG_NAME_KEY}(Max)
 */
const MAX_ORGKEY_LENGTH = 63;
const MAX_ORGNAME_LENGTH = 255;
const RESERVE_CHARS_KEY = 4;
/**
 * Convert from Org Name and Org Address To Org Key
 */
export function convertToOrgKey(orgName) {
  const reg = new RegExp(
    defineMessages.alphaNumericOnlyValidation.defaultMessage,
  );
  const maxChars = MAX_ORGKEY_LENGTH - RESERVE_CHARS_KEY;
  const allowedOrgNameLength =
    orgName.length > maxChars ? maxChars : orgName.length;
  return truncateAndToLowerCase(orgName, reg, allowedOrgNameLength);
}
export function trimOrgName(orgName) {
  return truncate(orgName, { length: MAX_ORGNAME_LENGTH, separator: '' });
}
export function beforeCreateUser({
  orgName,
  orgAddress,
  firstName,
  lastName,
  email,
  password,
  namekey,
  countryLong,
  countryShort,
  tourInvitationToken,
}) {
  // trim all whitespace in org address and connect to name to be the key
  const location = {
    address: orgAddress,
    country: countryLong,
    countryshort: countryShort,
  };
  const orgNameKey = !isEmptyString(namekey)
    ? namekey
    : `org-${convertToOrgKey(orgName)}-${convertToOrgKey(orgAddress)}`;
  const trimmedOrgName = trimOrgName(orgName);

  return {
    email,
    password,
    surname: lastName,
    givenName: firstName,
    location,
    orgNameKey,
    orgName: trimmedOrgName,
    tourInvitationToken,
  };
}

export function errorProcesser(error) {
  const msg =
    get(error, 'response.error.headers.error') || // 500 error
    get(error, 'response.error.message') || // 4xx errors
    get(error, 'message') ||
    error; // others
  return { error, msg };
}

export const USER_ID_CONFIG = {
  value: {
    userId: COGNITO_STORE_SELECTOR.userId.value,
  },
};

export const CONFIG = {
  name: USER_API,

  requests: {
    [CREATE_ORG_USER]: data =>
      requests.fetchWithURL('post', `/${USER_API}`, beforeCreateUser(data)),
    [CREATE_USER_VIA_INVITE]: data =>
      requests.fetchWithURL('post', `/${USER_API}/createUserViaInvite`, data),
    [GET_INVITATIONS]: ({ show = BOTH, status = PENDING }) =>
      requests.fetchWithAuthorisation(
        'get',
        `/${USER_API}/me/invitations?show=${show}&status=${status}`,
      ),
    [GET_ORGANISATION_INVITATIONS]: () =>
      requests.fetchWithAuthorisation('get', `/${USER_API}/me/orgInvitations`),
    [GET_ROLES]: ({ userId, options }) => {
      if (options) {
        return requests.fetchWithAuthorisation(
          'get',
          `/${USER_API}/${userId}/roles?options=${options}`,
        );
      }
      return requests.fetchWithAuthorisation(
        'get',
        `/${USER_API}/${userId}/roles`,
      );
    },
    [GET_RECENT_ACTIVITY]: () =>
      requests.fetchWithAuthorisation('get', `/${USER_API}/me/activities`),
    [GET_USER_RELATED_TEMPLATES]: () =>
      requests.fetchWithAuthorisation('get', `/${USER_API}/me/templates`),
    [HIDE_RECENT_ACTIVITY]: ({ nodeId }) =>
      requests.fetchWithAuthorisation(
        'patch',
        `/${USER_API}/${HIDE_RECENT_ACTIVITY}/${nodeId}`,
      ),
    [SIGN_IN]: AwsApi.signIn,
    [SIGN_OUT]: AwsApi.signOut,
    [FORGET_PWD]: AwsApi.forgetPassword,
    [RESET_PWD]: AwsApi.resetPassword,
    [CHANGE_PWD]: AwsApi.changePassword,
    [RESEND_SIGNUP]: AwsApi.resendSignUp,
    [ME]: () => requests.fetchWithAuthorisation('get', `/${USER_API}/me`),
    [PERSON_SYNC]: ({ id, data }) =>
      requests.fetchWithAuthorisation(
        'patch',
        `/${USER_API}/${id}/firstTimeSetup`,
        data,
      ),
    [CREATE_PERSONAL_REGISTRATION]: data =>
      requests.fetchWithURL('post', `/${USER_API}/createSimpleUser`, data),
    [REGISTER_DEVICE]: ({ id, data }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${USER_API}/${id}/registerDevice`,
        data,
      ),
    [UNREGISTER_DEVICE]: ({ id, data }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${USER_API}/${id}/unregisterDevice`,
        data,
      ),
    [UPDATE_USER_PREFERENCE]: ({ id, data }) =>
      requests.fetchWithAuthorisation(
        'patch',
        `/${USER_API}/${id}/upsertUserPreference`,
        data,
      ),
    [GET_USER_PREFERENCE]: ({ id }) =>
      requests.fetchWithAuthorisation(
        'get',
        `/${USER_API}/${id}/userPreference`,
      ),
    [GET_USER_NODE]: () =>
      requests.fetchWithAuthorisation('get', `/${USER_API}/me/userNode`),
    [GET_TRANSFER_NODE_LIST]: ({ show = BOTH, status = PENDING }) =>
      requests.fetchWithAuthorisation(
        'get',
        `/${USER_API}/me/transfers?show=${show}&status=${status}`,
      ),
    [GET_PERSONAL_PREFERENCES]: ({ id }) =>
      requests.fetchWithAuthorisation(
        'get',
        `/${USER_API}/${id}/Preferences/personal`,
      ),
    [UPSERT_PERSONAL_PREFERENCES]: ({ id, data }) =>
      requests.fetchWithAuthorisation(
        'patch',
        `/${USER_API}/${id}/Preferences/personal`,
        data,
      ),
  },

  processResult: {
    [GET_INVITATIONS]: helpers.normaliseGetInvitations,
    [GET_ORGANISATION_INVITATIONS]: helpers.normaliseGetOrgInvitations,
    [GET_ROLES]: USER_APIS_UTILS.normaliseRoles,
    [GET_RECENT_ACTIVITY]: recentActivityStoreHelper.normaliseRecentActivity,
    [HIDE_RECENT_ACTIVITY]: recentActivityStoreHelper.hideRecentActivity,
    [GET_USER_RELATED_TEMPLATES]: helpers.normaliseGetChecklists,
    [GET_USER_PREFERENCE]: helpers.normaliseUserPreference,
    [UPDATE_USER_PREFERENCE]: helpers.normaliseUpdateUserPreference,
    [ME]: helpers.normaliseGetMe,
    [GET_TRANSFER_NODE_LIST]: helpers.normaliseGetTourTransfer,
    [GET_PERSONAL_PREFERENCES]: helpers.normalisePersonalPreference,
    [UPSERT_PERSONAL_PREFERENCES]: helpers.normalisePersonalPreference,
  },

  value: {
    id: [USER_DATA_STORE, 'userId'],
  },

  setValue: {
    inviteeId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'inviteeId'],

    // for getInvitations
    fromMe: [INVITATION_STORE, 'fromMe'],
    toMe: [INVITATION_STORE, 'toMe'],
    completedFromMe: [INVITATION_STORE, 'completedFromMe'],
    completedToMe: [INVITATION_STORE, 'completedToMe'],
    share: INVITATION_STORE_SELECTORS.shares,
    shareSubNode: INVITATION_STORE_SELECTORS.shareSubNodes,
    orgInvitation: [INVITATION_STORE, 'joinOrganisations'],
    notification: [INVITATION_STORE, 'notifications'],
    node: [NODE_STORE, 'nodes'],
    person: [USER_DATA_STORE, 'people'],
    user: [USER_DATA_STORE, 'users'],
    userPreferences: [USER_DATA_STORE, 'preferences'],
    userNode: [USER_DATA_STORE, 'userNode'],
    orgInvitations: USER_STORE_SELECTORS.orgInvitations,
    notifications: USER_STORE_SELECTORS.notifications,
    organisation: [ORGANISATION_DATA_STORE, 'organisations'],
    orgUsers: [USER_DATA_STORE, 'orgUsers'],
    userNodes: [USER_DATA_STORE, 'userNodes'],
    recentActivity: [COORDINATE_DATA_STORE, 'recentActivities'],
    recentActivityIds: [COORDINATE_DATA_STORE, 'recentActivityIds'],
    checklistIds: [DASHBOARD_VIEW_STORE, 'checklistIds'],
    loginAcctUser: [COGNITO_ACCOUNTSTORE, 'account'],
    loginAcctOrg: [COGNITO_ACCOUNTSTORE, 'orgs'],
    loginAcctPerson: [COGNITO_ACCOUNTSTORE, 'person'],
    loginAcctRelatedOrgs: [COGNITO_ACCOUNTSTORE, 'accountRelatedOrgs'],
    loginDeviceToken: [COGNITO_ACCOUNTSTORE, 'devicetoken'],
    file: FILE_STORE_SELECTORS.files,
    nodeTransfer: INVITATION_STORE_SELECTORS.nodeTransfers,
    transferToMe: INVITATION_STORE_SELECTORS.transferToMe,
    transferFromMe: INVITATION_STORE_SELECTORS.transferFromMe,
    calculatedNodes: NODE_STORE_SELECTORS.calculatedNodes,
  },
  processError: {
    [SIGN_IN]: error => errorProcesser(error),
    [CREATE_ORG_USER]: error => errorProcesser(error),
    [CREATE_USER_VIA_INVITE]: error => errorProcesser(error),
    [FORGET_PWD]: error => errorProcesser(error),
    [RESET_PWD]: error => errorProcesser(error),
    [CHANGE_PWD]: error => errorProcesser(error),
    [CREATE_PERSONAL_REGISTRATION]: error => errorProcesser(error),
  },

  manuallySubscribe: true, // will not auto-subscribe to all values in `@@values`
};
