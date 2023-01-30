import { CONFIG } from '../config';

describe('RoleItems/config.js', () => {
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
  describe('ownerId', () => {
    it('should exists', () => {
      expect(CONFIG.value.ownerId({ orgId: 1 })).toEqual([
        'organisationDataStore',
        'organisations',
        1,
        'createdBy',
      ]);
    });
  });
  describe('activated', () => {
    it('should exists', () => {
      expect(CONFIG.setValue.activated({ orgId: 1 })).toEqual([
        'organisationDataStore',
        'roles',
        1,
        'activated',
      ]);
    });
  });
});
