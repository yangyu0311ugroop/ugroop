import { CONFIG, USER_CONFIG } from '../config';

describe('config.js', () => {
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

  describe('config.value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });
    it('CONFIG.VALUE.orgUserIds', () => {
      expect(typeof CONFIG.value.orgUserIds({ userId: 1 })).toBe('object');
    });
  });
  it('CONFIG.VALUE.tours', () => {
    expect(typeof CONFIG.value.tours({ selectedOrgId: 1 })).toBe('object');
  });
  describe('USER_CONFIG.value', () => {
    it('should exists', () => {
      expect(typeof USER_CONFIG.value).toBe('object');
    });
    it('CONFIG.VALUE.orgUserIds', () => {
      expect(USER_CONFIG.value.fetchTour.getter(1)).toEqual(false);
    });
  });
  describe('CONFIG.value.personModel', () => {
    it('CONFIG.VALUE.orgUserIds', () => {
      expect(typeof CONFIG.value.personModel({ personId: 1 })).toBe('object');
    });
  });
  describe('USER_CONFIG.personId', () => {
    it('CONFIG.VALUE.personId', () => {
      expect(USER_CONFIG.value.personId.keyPath({ id: 1 })).toEqual([
        'nodeStore',
        'nodes',
        1,
        'calculated',
        'people',
      ]);
    });
    it('CONFIG.VALUE.personId', () => {
      expect(USER_CONFIG.value.personId.getter([1])).toEqual(1);
    });
  });
});
