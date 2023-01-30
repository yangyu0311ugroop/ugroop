import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG, CONFIG2 } from '../config';

describe('Overview/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });
  describe('CONFIG.value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });
  });

  describe('CONFIG2.value', () => {
    it('should exists', () => {
      expect(typeof CONFIG2.value).toBe('object');
    });

    describe('CONFIG2.value.visibleTabIds', () => {
      it('should exists', () => {
        expect(CONFIG2.value.visibleTabIds({ templateId: 1 })).toEqual(
          NODE_STORE_SELECTORS.calculatedVisibleChildren({ id: 1 }),
        );
      });
    });
  });
  describe('CONFIG2.setValue', () => {
    it('should exists', () => {
      expect(typeof CONFIG2.setValue).toBe('object');
    });
  });
});
