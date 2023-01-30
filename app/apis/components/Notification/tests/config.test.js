import {
  ORGANISATION_DATA_STORE,
  USER_DATA_STORE,
  NODE_STORE,
  NOTIFICATION_DATASTORE,
  FILE_DATA_STORE,
} from 'appConstants';
import {
  GET_UGROOP_NOTIFICATION,
  UPDATE_UGROOP_NOTIFICATION_STATUS,
} from 'apis/constants';
import { requests } from 'utils/request';
import { CONFIG } from '../config';
import { NOTIFICATION_NORMALISERS } from '../normalisers';

describe('Notification/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(CONFIG).toMatchSnapshot();
    });
  });

  describe('requests', () => {
    it('GET_UGROOP_NOTIFICATION should call fetchWithAuthorisation', () => {
      requests.fetchWithAuthorisation = jest.fn();
      CONFIG.requests[GET_UGROOP_NOTIFICATION]();
      expect(requests.fetchWithAuthorisation).toBeCalled();
    });
    it('UPDATE_UGROOP_NOTIFICATION_STATUS should call fetchWithAuthorisation', () => {
      requests.fetchWithAuthorisation = jest.fn();
      CONFIG.requests[UPDATE_UGROOP_NOTIFICATION_STATUS]({
        id: 1,
        ugroopId: 2,
        data: 'abcd',
      });
      expect(requests.fetchWithAuthorisation).toBeCalled();
    });
  });

  describe('set value', () => {
    it('shall return correct data', () => {
      expect(CONFIG.setValue.organisations).toEqual([
        ORGANISATION_DATA_STORE,
        'organisations',
      ]);
      expect(CONFIG.setValue.people).toEqual([USER_DATA_STORE, 'people']);
      expect(CONFIG.setValue.ugroopNotifications).toEqual([
        NOTIFICATION_DATASTORE,
        'ugroop',
      ]);
      expect(CONFIG.setValue.nodes).toEqual([NODE_STORE, 'nodes']);
      expect(CONFIG.setValue.ugroopIds).toEqual([
        NOTIFICATION_DATASTORE,
        'ugroopIds',
      ]);
      expect(CONFIG.setValue.photo).toEqual([FILE_DATA_STORE, 'files']);
    });
  });

  describe('processResult', () => {
    it('shall return correct data', () => {
      expect(CONFIG.processResult[GET_UGROOP_NOTIFICATION]).toBe(
        NOTIFICATION_NORMALISERS.addNotifications,
      );
    });
  });
});
