import { CONFIG } from '../config';

describe('PhoneList/config.js', () => {
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

    describe('showCreateForm', () => {
      it('should return a particular array shape', () => {
        expect(
          CONFIG.setValue.showCreateForm({ viewStore: 'myViewStore' }),
        ).toEqual(['myViewStore', 'showCreateForm']);
      });
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('showCreateForm', () => {
      it('should return a particular array shape', () => {
        expect(
          CONFIG.value.showCreateForm({ viewStore: 'myViewStore' }),
        ).toEqual(['myViewStore', 'showCreateForm']);
      });
    });
  });
});
