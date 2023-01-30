import {
  CONFIRM_INVITATION,
  DECLINE_INVITATION,
  ORG_INVITATION_API,
} from 'apis/constants';
import {
  ABILITY_DATA_STORE,
  INVITATION_STORE,
  ORGANISATION_DATA_STORE,
  USER_DATA_STORE,
} from 'appConstants';
import { DATASTORE_UTILS } from 'datastore';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { requests } from 'utils/request';

const normaliseInvitationAction = ({
  notificationToken,
  status,
  updatedAt,
}) => ({
  shares: DATASTORE_UTILS.upsertObject({
    [notificationToken]: { status, updatedAt },
  }),
});

export const helpers = {
  normaliseInvitationAction,
};

export const CONFIG = {
  name: ORG_INVITATION_API,

  requests: {
    [CONFIRM_INVITATION]: ({ token, content }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${ORG_INVITATION_API}/${token}/accept`,
        { content },
      ),
    [DECLINE_INVITATION]: ({ token, content }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${ORG_INVITATION_API}/${token}/decline`,
        { content },
      ),
  },

  processResult: {
    [CONFIRM_INVITATION]: (orgUser, { token }) => ({
      orgUser,
      orgInvitations: DATASTORE_UTILS.removeItemsInArray(token),
      notifications: DATASTORE_UTILS.removeItemsInArray(token),
    }),
    [DECLINE_INVITATION]: (result, { token }) => ({
      orgInvitations: DATASTORE_UTILS.removeItemsInArray(token),
      notifications: DATASTORE_UTILS.removeItemsInArray(token),
    }),
  },

  value: {
    organisationAbilities: [ABILITY_DATA_STORE, 'definitions', 'organisation'],
    id: [USER_DATA_STORE, 'userId'],
  },

  setValue: {
    orgInvitations: USER_STORE_SELECTORS.orgInvitations,
    notifications: USER_STORE_SELECTORS.notifications,
    shares: [INVITATION_STORE, 'shares'],
    tours: [ABILITY_DATA_STORE, 'tours'],
    organisationAbilities: [ABILITY_DATA_STORE, 'organisation'],
    users: [USER_DATA_STORE, 'users'],
    orgUsers: [ORGANISATION_DATA_STORE, 'orgUsers'],
  },

  manuallySubscribe: true, // will not auto-subscribe to all values in `@@values`
};
