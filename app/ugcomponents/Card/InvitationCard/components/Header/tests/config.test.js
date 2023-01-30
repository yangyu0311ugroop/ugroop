import { CONFIG } from '../config';

describe('Header/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should match snapshot', () => {
      expect(CONFIG).toMatchSnapshot();
    });
  });
  describe('expanded', () => {
    it('should return a particular keypath shape', () => {
      expect(CONFIG.value.expanded.keyPath({ userId: 1 })).toMatchSnapshot();
    });
    it('should return a particular getter shape', () => {
      expect(CONFIG.value.expanded.getter('')).toMatchSnapshot();
    });
    it('should return default value a particular getter shape', () => {
      expect(CONFIG.value.expanded.getter()).toMatchSnapshot();
    });
  });
});
