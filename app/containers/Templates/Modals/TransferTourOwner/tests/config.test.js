import { CONFIG, CONFIG_2 } from '../config';

describe('TransferTourOwner/config.js', () => {
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

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG_2.value).toBe('object');
    });
    it('should exists', () => {
      expect(typeof CONFIG_2.value.memberEmail({ transferToUserId: 1 })).toBe(
        'object',
      );
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof CONFIG_2.setValue).toBe('object');
    });
  });
});
