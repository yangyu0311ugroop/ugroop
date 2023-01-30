import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG } from '../config';

describe('LastDayEndTime/config.js', () => {
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

    describe('endTime', () => {
      it('should exists', () => {
        expect(CONFIG.setValue.endTime({ template: 2233 })).toEqual(
          NODE_STORE_SELECTORS.calculatedEnd({ id: 2233 }),
        );
      });
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('endTime', () => {
      it('should return keyPath', () => {
        expect(CONFIG.value.endTime.cacheKey({ id: 2233 })).toEqual(
          `${2233}.endTime`,
        );
      });

      it('should return getter !real', () => {
        expect(CONFIG.value.endTime.getter({ real: false })).toEqual(null);
      });

      it('should return getter real', () => {
        const value = '1899-12-30T11:59:59.999Z';

        expect(CONFIG.value.endTime.getter({ real: true, value })).not.toEqual(
          null,
        );
      });
    });
  });
});
