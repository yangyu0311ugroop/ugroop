import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG } from '../config';

describe('TabGallery/config.js', () => {
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

    describe('index', () => {
      it('should exists', () => {
        expect(CONFIG.value.index.cacheKey({ id: 2233 })).toMatchSnapshot();
        expect(CONFIG.value.index.keyPath({ templateId: 2233 })).toEqual(
          NODE_STORE_SELECTORS.calculatedVisibleChildren({ id: 2233 }),
        );
        expect(CONFIG.value.index.props({ id: 2233 })).toEqual(2233);
        expect(CONFIG.value.index.getter([11, 22], 22)).toEqual(1);
        expect(CONFIG.value.index.getter()).toEqual(-1);
      });
    });
  });
});
