import { CONFIG, CONFIG2 } from '../config';

describe('TransferByEmail/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof CONFIG2.setValue).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });
  });
  describe('CONFIG2.value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });
    it('should exists', () => {
      expect(CONFIG2.value.ownerEmail({ createdBy: 1 })).toEqual([
        'userDataStore',
        'people',
        1,
        'email',
      ]);
    });
  });
});
