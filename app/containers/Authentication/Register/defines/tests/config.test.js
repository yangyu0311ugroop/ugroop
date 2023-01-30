import { NOTIFICATION_DATASTORE } from 'appConstants';
import { requests } from 'utils/request';
import { CREATE_ORG_USER, USER_API } from 'apis/constants';
import { CONFIG } from '../config';

describe('Config Test', () => {
  describe('CONFIG', () => {
    it('isLoading', () => {
      requests.postJSONRequest = jest.fn();
      expect(CONFIG.isLoading).toEqual({
        isLoading: [USER_API, CREATE_ORG_USER],
      });
    });
  });

  describe('value', () => {
    it('should match snapshot', () => {
      expect(CONFIG.value).toMatchSnapshot();
    });

    describe('notifications', () => {
      it('should work correctly', () => {
        expect(
          CONFIG.value.notifications.keyPath({
            match: { params: { token: 'abcd' } },
          }),
        ).toEqual([
          NOTIFICATION_DATASTORE,
          'notifications',
          'abcd',
          'remoteContent',
        ]);
      });
    });

    describe('token', () => {
      it('should work correctly', () => {
        expect(
          CONFIG.value.token.getter({ match: { params: { token: 'abcd' } } }),
        ).toEqual('abcd');
      });
    });

    describe('isRegisterByTourInvitation', () => {
      it('should work correctly', () => {
        expect(
          CONFIG.value.isRegisterByTourInvitation.getter({
            shareTo: true,
            senderEmail: true,
          }),
        ).toBe(true);
      });
      it('should work correctly', () => {
        expect(
          CONFIG.value.isRegisterByTourInvitation.getter({
            shareTo: null,
            senderEmail: true,
            transferTo: true,
          }),
        ).toBe(true);
      });
    });

    describe('isRegisterByOrgInvitation', () => {
      it('should work correctly', () => {
        expect(
          CONFIG.value.isRegisterByOrgInvitation.getter({
            shareTo: true,
            senderEmail: true,
            organisationName: 'Abc',
            inviteToOrganisation: true,
          }),
        ).toBe(true);
      });
    });
    describe('shareTo', () => {
      it('should work correctly', () => {
        expect(
          CONFIG.value.shareTo.getter({ shareTo: '1', transferTo: null }),
        ).toBe('1');
      });
      it('should work correctly', () => {
        expect(
          CONFIG.value.shareTo.getter({ shareTo: null, transferTo: '2' }),
        ).toBe('2');
      });
    });
  });
});
