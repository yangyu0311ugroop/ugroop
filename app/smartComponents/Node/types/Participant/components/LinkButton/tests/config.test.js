import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { CONFIG } from '../config';

describe('LinkButton/config.js', () => {
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

    it('should have firstName', () => {
      expect(CONFIG.value.firstName({ id: 1 })).toEqual(
        NODE_STORE_SELECTORS.nodeProp({ id: 1, path: NODE_PATHS.firstName }),
      );
    });

    it('should have lastName', () => {
      expect(CONFIG.value.lastName({ id: 1 })).toEqual(
        NODE_STORE_SELECTORS.nodeProp({ id: 1, path: NODE_PATHS.lastName }),
      );
    });
  });
});
