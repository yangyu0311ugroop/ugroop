import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG } from '../config';

describe('PhotoPreview/config.js', () => {
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

    describe('exist', () => {
      it('should exists', () => {
        expect(CONFIG.value.exist({ previewId: 2233 })).toEqual(
          NODE_STORE_SELECTORS.id({ id: 2233 }),
        );
      });
    });

    describe('createdBy', () => {
      it('should createdBys', () => {
        expect(CONFIG.value.createdBy({ previewId: 2233 })).toEqual(
          NODE_STORE_SELECTORS.createdBy({ id: 2233 }),
        );
      });
    });
  });
});
