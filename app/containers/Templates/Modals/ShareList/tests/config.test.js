import { CONFIG } from '../config';

describe('ShareList/config.js', () => {
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
    it('return orgid if is a member', () => {
      expect(CONFIG.value.orgId.getter(1, [1])).toEqual(1);
    });
    it('Return first org on the array', () => {
      expect(CONFIG.value.orgId.getter(2, [1])).toEqual(1);
    });
    it('Return null if not a member', () => {
      expect(CONFIG.value.orgId.getter(2)).toEqual(null);
    });
  });
});
