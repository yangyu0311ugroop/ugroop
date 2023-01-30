import { CONFIG } from '../config';

describe('TransferByUser/config.js', () => {
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
  });
  describe('value.peopleIds', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value.peopleIds({ orgId: 1 })).toBe('object');
    });
  });
});
