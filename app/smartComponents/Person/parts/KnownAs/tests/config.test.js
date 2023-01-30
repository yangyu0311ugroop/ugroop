import { ORGANISATION_DATA_STORE } from 'appConstants';
import { CONFIG } from '../config';

describe('KnownAs/config.js', () => {
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

  describe('hasPersonDetail', () => {
    it('should return something', () => {
      expect(CONFIG.value.hasPersonDetail({ id: 999 })).toEqual([
        ORGANISATION_DATA_STORE,
        'members',
        999,
        'hasPersonDetail',
      ]);
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should setValue person', () => {
      expect(CONFIG.setValue.person({ organisationId: 1 })).toEqual([
        ORGANISATION_DATA_STORE,
        'roles',
        1,
        'confirmed',
      ]);
    });
  });
});
