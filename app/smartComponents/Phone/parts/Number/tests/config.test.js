import { ORGANISATION_DATA_STORE } from 'appConstants';
import { CONFIG } from '../config';

describe('Number/config.js', () => {
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
    it('should have organisationId', () => {
      expect(CONFIG.value.organisationId).toEqual([
        ORGANISATION_DATA_STORE,
        'organisationId',
      ]);
    });
  });
});
