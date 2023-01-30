import {
  GET_UGROOP_NOTIFICATION,
  NOTIFICATION_API,
  UPDATE_UGROOP_NOTIFICATION_STATUS,
} from 'apis/constants';
import {
  ORGANISATION_DATA_STORE,
  USER_DATA_STORE,
  NODE_STORE,
  NOTIFICATION_DATASTORE,
  FILE_DATA_STORE,
} from 'appConstants';
import { requests } from 'utils/request';
import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';
import { NOTIFICATION_NORMALISERS } from './normalisers';

export const CONFIG = {
  name: NOTIFICATION_API,
  requests: {
    [GET_UGROOP_NOTIFICATION]: () =>
      requests.fetchWithAuthorisation('get', `/${NOTIFICATION_API}/Ugroop`),
    [UPDATE_UGROOP_NOTIFICATION_STATUS]: ({ id, ugroopid, data }) =>
      requests.fetchWithAuthorisation(
        'patch',
        `/${NOTIFICATION_API}/${id}/ugroop/${ugroopid}`,
        data,
      ),
  },
  setValue: {
    organisations: [ORGANISATION_DATA_STORE, 'organisations'],
    people: [USER_DATA_STORE, 'people'],
    peopleById: PERSON_STORE_SELECTORS.people,
    ugroopNotifications: [NOTIFICATION_DATASTORE, 'ugroop'],
    nodes: [NODE_STORE, 'nodes'],
    ugroopIds: [NOTIFICATION_DATASTORE, 'ugroopIds'],
    photo: [FILE_DATA_STORE, 'files'],
  },

  processResult: {
    [GET_UGROOP_NOTIFICATION]: NOTIFICATION_NORMALISERS.addNotifications,
  },

  manuallySubscribe: true, // will not auto-subscribe to all values in `@@values`
};
