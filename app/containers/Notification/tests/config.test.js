import { GET_TOKEN, INVITATION_API } from 'apis/constants';
import { CONFIG } from '../config';

describe('NotificationPage/config.js', () => {
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
  });

  describe('isLoading', () => {
    it('should exists', () => {
      expect(typeof CONFIG.isLoading).toBe('object');
    });

    describe('fetching', () => {
      it('should exists', () => {
        expect(CONFIG.isLoading.fetching).toEqual([INVITATION_API, GET_TOKEN]);
      });
    });
  });
});
