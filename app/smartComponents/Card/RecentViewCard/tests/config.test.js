import { CONFIG } from '../config';

describe('ChecklistCard/config.js', () => {
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
  describe('open', () => {
    it('should return a particular keypath shape', () => {
      expect(CONFIG.value.open.keyPath({ userId: 1 })).toMatchSnapshot();
    });
    it('should return a particular getter shape', () => {
      expect(CONFIG.value.open.getter('')).toMatchSnapshot();
    });
    it('should return a particular getter shape with a default value', () => {
      expect(CONFIG.value.open.getter()).toMatchSnapshot();
    });
  });
});
