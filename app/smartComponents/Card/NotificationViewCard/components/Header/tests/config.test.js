import { COGNITO_ACCOUNTSTORE, NOTIFICATION_DATASTORE } from 'appConstants';
import { CONFIG } from '../config';

describe('smartComponents/Card/NotificationViewCard/components/Header/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });

    describe('#value', () => {
      it('userId', () => {
        expect(CONFIG.value.userId).toEqual([
          COGNITO_ACCOUNTSTORE,
          'account',
          'id',
        ]);
      });
      it('ugroopIds', () => {
        expect(CONFIG.value.ugroopIds).toMatchSnapshot();
      });
    });

    describe('#set value', () => {
      it('ugroopStatus', () => {
        expect(CONFIG.setValue.ugroopStatus).toEqual([
          NOTIFICATION_DATASTORE,
          'ugroop',
        ]);
      });
    });
  });
});
