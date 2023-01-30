import { CONFIG } from '../config';

describe('Passport/config.js', () => {
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

    describe('passports', () => {
      it('should return a particular array shape given the userId', () => {
        expect(CONFIG.value.passports({ userId: 1 })).toMatchSnapshot();
      });
    });
  });

  describe('isLoading', () => {
    describe('isUpdateCreateLoading#getter', () => {
      it('should return true if one of the two params is true', () => {
        const result = CONFIG.isLoading.isUpdateCreateLoading.getter(
          false,
          true,
        );
        expect(result).toBe(true);
      });

      it('should return false if one both the two params is false', () => {
        const result = CONFIG.isLoading.isUpdateCreateLoading.getter(
          false,
          false,
        );
        expect(result).toBe(false);
      });
    });
  });
});
