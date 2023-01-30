import { CONFIG, SET_VALUE } from '../config';

describe('FollowerMenuButton/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });
  });
});

describe('SET_VALUE', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof SET_VALUE).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof SET_VALUE.setValue).toBe('object');
    });
  });
});
