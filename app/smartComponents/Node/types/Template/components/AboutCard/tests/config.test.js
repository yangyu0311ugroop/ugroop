import { CONFIG } from '../config';

describe('AboutCard/config.js', () => {
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
  describe('value.peopleTabIndex', () => {
    it('cacheKey', () => {
      expect(CONFIG.value.peopleTabIndex.cacheKey({ id: 1 })).toEqual(
        'node.1.abountCard.peopleTabIdIndex',
      );
    });
    it('getter', () => {
      expect(CONFIG.value.peopleTabIndex.getter([1, 2], 2)).toEqual(1);
    });
  });
});
