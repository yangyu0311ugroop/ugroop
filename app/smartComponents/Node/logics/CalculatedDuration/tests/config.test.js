import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG } from '../config';

describe('CalculatedDuration/config.js', () => {
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

    describe('setValue', () => {
      it('should exists', () => {
        expect(typeof CONFIG.setValue).toBe('object');
      });
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('duration', () => {
      it('should exists', () => {
        expect(CONFIG.value.duration({ templateId: 2233 })).toEqual(
          NODE_STORE_SELECTORS.duration({ id: 2233 }),
        );
      });
    });

    describe('childrenCount', () => {
      it('should exists', () => {
        expect(CONFIG.value.childrenCount({ tabId: 2233 })).toEqual(
          NODE_STORE_SELECTORS.childrenCount({ id: 2233 }),
        );
      });
    });
  });
});
