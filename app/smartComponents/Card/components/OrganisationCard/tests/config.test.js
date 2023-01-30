import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { CONFIG } from '../config';

describe('OrganisationCard/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof CONFIG.setValue).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('organisations', () => {
      it('should exists', () => {
        expect(CONFIG.value.organisations({ userId: 2233 })).toEqual(
          USER_STORE_SELECTORS.organisations({ id: 2233 }),
        );
      });
    });

    describe('orgInvitations', () => {
      it('should exists', () => {
        expect(CONFIG.value.orgInvitations({ userId: 2233 })).toEqual(
          USER_STORE_SELECTORS.orgInvitations({ id: 2233 }),
        );
      });
    });
  });
});
