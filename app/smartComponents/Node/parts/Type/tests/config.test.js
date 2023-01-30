import { CONFIG } from '../config';

describe('Type/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(CONFIG).toMatchSnapshot();
    });
  });

  describe('value', () => {
    describe('type', () => {
      describe('cacheKey', () => {
        it('should return a particular cacheKey', () => {
          expect(CONFIG.value.type.cacheKey({ id: 1 })).toMatchSnapshot();
        });
      });
    });
  });
});
