import { CONFIG } from '../config';

describe('CONFIG', () => {
  describe('customTabIds', () => {
    it('should have getter', () => {
      const customTabIds = [1, 2, 3];
      const filteredNodeIds = ['1', '2', '3'];
      const relatedIds = [[1, 'tabother'], [2, 'tabother'], [3, 'tabother']];
      expect(
        CONFIG.value.customTabIds.getter({ relatedIds, filteredNodeIds }),
      ).toEqual(customTabIds);
    });
    it('should not break when customids is null', () => {
      const relatedIds = [[1, 'tabother'], [2, 'tabother'], [3, 'tabother']];
      expect(CONFIG.value.customTabIds.getter({ relatedIds })).toEqual([]);
    });
  });
});
