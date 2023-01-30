import {
  INVITATION_SWITCH_ACCOUNT_STORE,
  NOTIFICATION_DATASTORE,
} from 'appConstants';
/**
 * Created by Jay on 1/7/17.
 */
import { CONFIG } from '../config';

describe('app/containers/Authentication/Login/defines/config', () => {
  describe('config', () => {
    it('should exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });
  describe('value', () => {
    it('should match snapshot', () => {
      expect(CONFIG.value).toMatchSnapshot();
    });

    it('notifications', () => {
      expect(
        CONFIG.value.notifications.keyPath({
          match: { params: { token: 'some@token' } },
        }),
      ).toEqual([
        NOTIFICATION_DATASTORE,
        'notifications',
        'some@token',
        'remoteContent',
      ]);
    });

    it('token', () => {
      expect(
        CONFIG.value.token.getter({
          match: { params: { token: 'some@token' } },
        }),
      ).toBe('some@token');
    });

    it('isRegisterByInvitation', () => {
      expect(
        CONFIG.value.isRegisterByInvitation.getter({
          shareTo: true,
          senderEmail: true,
          organisationName: true,
        }),
      ).toBe(true);
    });

    it('decline', () => {
      expect(CONFIG.value.decline).toEqual([
        INVITATION_SWITCH_ACCOUNT_STORE,
        'decline',
      ]);
    });
  });
});
