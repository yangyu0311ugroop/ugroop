import { NODE_TRAIL_NORMALISERS } from '../schema';

describe('NODE_TRAIL_NORMALISERS', () => {
  describe('breadcrumbNormaliser', () => {
    it('should return breadcrumb, trail and id', () => {
      const data = {
        id: 1,
        trail: [
          { id: 2, name: '222', parentNodeId: 1 },
          { id: 3, name: '333', parentNodeId: 2 },
        ],
      };

      expect(
        NODE_TRAIL_NORMALISERS.breadcrumbNormaliser(data),
      ).toMatchSnapshot();
    });
  });
});
