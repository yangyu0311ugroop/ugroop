import { APP_DATA_CACHE, SHARED_TEMPLATES_DATASTORE } from 'appConstants';
import { CONFIG, CONFIG2 } from '../config';

describe('Template/config.js', () => {
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
    it('should have isSharedTours', () => {
      expect(CONFIG.value.isSharedTours).toEqual([
        SHARED_TEMPLATES_DATASTORE,
        'pageSelected',
      ]);
    });
    it('should have cardImageUrl', () => {
      expect(CONFIG.value.cardImageUrl({ id: 1 })).toEqual([
        APP_DATA_CACHE,
        'cardImageList',
        1,
      ]);
    });
  });
  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG2).toBe('object');
    });
  });
});
