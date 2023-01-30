import { CONFIG } from '../config';

describe('SeeDetail/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(CONFIG.value).toMatchSnapshot();
    });

    describe('userId', () => {
      it('userId getter', () => {
        const result = CONFIG.value.userId.getter(0, 1);
        expect(result).toBe(1);
      });
    });
  });
});
