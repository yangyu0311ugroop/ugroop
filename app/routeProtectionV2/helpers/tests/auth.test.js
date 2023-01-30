import { URL_HELPERS } from 'appConstants';
import auth, { locationHelper } from '../auth';
import setup from '../setup';
import utils from '../utils';

describe('Auth Utility Functions', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('isAuthenticated', () => {
    it('should be defined', () => {
      expect(typeof auth.isAuthenticated).toBe('function');
    });

    it('should return true', () => {
      utils.selectAccount = jest.fn(() => true);
      expect(auth.isAuthenticated()).toBe(true);
    });

    it('should return false', () => {
      utils.selectAccount = jest.fn(() => false);
      expect(auth.isAuthenticated()).toBe(false);
    });
  });

  describe('isNotAuthenticated', () => {
    it('should be defined', () => {
      expect(typeof auth.isNotAuthenticated).toBe('function');
    });

    it('should return true', () => {
      utils.selectAccount = jest.fn(() => false);
      expect(auth.isNotAuthenticated()).toBe(true);
    });

    it('should return false', () => {
      utils.selectAccount = jest.fn(() => true);
      expect(auth.isNotAuthenticated()).toBe(false);
    });
  });

  describe('authenticatedRedirect', () => {
    it('should be defined', () => {
      expect(typeof auth.authenticatedRedirect).toBe('function');
    });

    it('should return query', () => {
      locationHelper.getRedirectQueryParam = jest.fn(() => 123);
      expect(auth.authenticatedRedirect()).toBe(123);
    });

    it('should return /admin', () => {
      locationHelper.getRedirectQueryParam = jest.fn(() => false);
      setup.isSetupDone = jest.fn(() => true);
      expect(auth.authenticatedRedirect()).toBe(URL_HELPERS.myTours());
    });

    it('should return /admin/setup', () => {
      locationHelper.getRedirectQueryParam = jest.fn(() => false);
      setup.isSetupDone = jest.fn(() => false);
      expect(auth.authenticatedRedirect()).toBe('/admin/setup');
    });
  });
});
