import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { APP_DATA_CACHE } from 'appConstants';

import { CONFIG } from '../config';

describe('config', () => {
  describe('value', () => {
    it('should return content', () => {
      expect(CONFIG.value.content).toEqual(NODE_STORE_SELECTORS.content);
    });
    it('should return description', () => {
      expect(CONFIG.value.description).toEqual(
        NODE_STORE_SELECTORS.shortDescription,
      );
    });
    it('should return startDate', () => {
      expect(CONFIG.value.startDate).toEqual(NODE_STORE_SELECTORS.startDate);
    });
    it('should return weekDay', () => {
      expect(CONFIG.value.weekDay).toEqual(NODE_STORE_SELECTORS.weekDay);
    });
    it('should return duration', () => {
      expect(CONFIG.value.duration).toEqual(NODE_STORE_SELECTORS.duration);
    });
    it('should return type', () => {
      expect(CONFIG.value.type).toEqual(NODE_STORE_SELECTORS.type);
    });
    it('should return cardImageUrl', () => {
      expect(CONFIG.value.cardImageUrl({ id: 1 })).toEqual([
        APP_DATA_CACHE,
        'cardImageList',
        1,
      ]);
    });
  });
});
