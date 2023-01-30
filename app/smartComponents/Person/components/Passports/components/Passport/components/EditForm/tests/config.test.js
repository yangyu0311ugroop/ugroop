import { CONFIG } from '../config';

describe('EditForm/config.js', () => {
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
      it('should return a particular array shape', () => {
        expect(CONFIG.value.passports({ userId: 1 })).toMatchSnapshot();
      });
    });
  });
});
