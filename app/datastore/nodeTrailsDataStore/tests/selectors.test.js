import { NODE_TRAIL_STORE_SELECTORS } from 'datastore/nodeTrailsDataStore/selectors';

describe('NODE_TRAIL_STORE_SELECTORS', () => {
  describe('trails', () => {
    it('should return a particular keypath shape', () => {
      Object.keys(NODE_TRAIL_STORE_SELECTORS.trails).forEach(key => {
        expect(
          NODE_TRAIL_STORE_SELECTORS.trails[key]({ id: 1 }),
        ).toMatchSnapshot();
      });
    });
  });

  describe('breadcrumb', () => {
    it('should return a particular keypath shape', () => {
      Object.keys(NODE_TRAIL_STORE_SELECTORS.breadcrumb).forEach(key => {
        expect(
          NODE_TRAIL_STORE_SELECTORS.breadcrumb[key]({ id: 1 }),
        ).toMatchSnapshot();
      });
    });
  });
});
