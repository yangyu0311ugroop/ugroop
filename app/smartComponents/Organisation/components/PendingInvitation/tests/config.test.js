import { CONFIG } from '../config';

describe('People/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(CONFIG).toMatchSnapshot();
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof CONFIG.setValue).toBe('object');
    });
  });
});
