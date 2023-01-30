import {
  CONFIRMED,
  INVITATION_STORE,
  PENDING,
  COGNITO_ACCOUNTSTORE,
  ORGANISATION_VIEWSTORE,
} from 'appConstants';
import {
  getOrganisationOwnerId,
  getMemberEmailByIds,
  getPeopleIds,
  getPendingInvitations,
} from 'datastore/orgStore/selectors';
export const CONFIG_IDS = {
  value: {
    peopleIds: ({ id }) => getPeopleIds({ id }),
  },
};

export const CONFIG = {
  value: {
    people: getMemberEmailByIds,
    pendingInvitations: getPendingInvitations,
    myEmail: [COGNITO_ACCOUNTSTORE, 'account', 'email'],
    owner: getOrganisationOwnerId,
    exist: {
      keyPath: [ORGANISATION_VIEWSTORE, 'inviteeEmail'],
      getter: invitee => !!invitee,
    },
    status: {
      keyPath: ({ inviteeToken }) => [
        INVITATION_STORE,
        'organisationShares',
        inviteeToken,
        'status',
      ],
      getter: status => ({
        pending: status === PENDING,
        accepted: status === CONFIRMED,
      }),
      spreadObject: true,
    },
  },
  setValue: {},
};
