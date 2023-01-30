import { CONFIG, CONFIG2 } from '../config';

describe('InviteByEmail/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG2).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof CONFIG2.setValue).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });
  });
  describe('isMember', () => {
    it('should return properly', () => {
      expect(CONFIG.value.isMember.getter([{ id: 1 }], 1)).toBe(true);
      expect(CONFIG.value.isMember.getter([{ id: 1 }], 2)).toBe(false);
      expect(CONFIG.value.isMember.getter(null, null)).toBe(false);
      expect(CONFIG.value.isMember.getter()).toBe(false);
    });
  });
});
