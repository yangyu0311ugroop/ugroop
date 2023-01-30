import { APP_DATA_CACHE } from 'appConstants';
import { CONFIG } from '../config';

describe('TemplateItem config ', () => {
  describe('CONFIG.value ', () => {
    let result;

    it('cardImageUrl ', () => {
      result = CONFIG.value.cardImageUrl({ id: 123 });
      expect(result).toEqual([APP_DATA_CACHE, 'cardImageList', 123]);
    });
  });
});
