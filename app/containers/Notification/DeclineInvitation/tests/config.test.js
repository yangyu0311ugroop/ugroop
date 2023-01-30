import { CONFIG } from '../config';

describe('TokenResolver/config.js', () => {
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
      expect(CONFIG.value).toMatchSnapshot();
    });

    describe('value', () => {
      it('should tokenId', () => {
        expect(
          CONFIG.value.tokenId.getter({ match: { params: { token: 'abcd' } } }),
        ).toBe('abcd');
      });
    });
  });
});
