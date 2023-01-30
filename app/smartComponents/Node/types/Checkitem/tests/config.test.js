import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG, CHECKITEMS_CONFIG } from '../config';

describe('Checkitem/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(CONFIG).toMatchSnapshot();
    });
  });

  describe('CHECKITEMS_CONFIG checkitems', () => {
    it('should have keyPath', () => {
      expect(CHECKITEMS_CONFIG.value.checkitems({ parentNodeId: 1 })).toEqual(
        NODE_STORE_SELECTORS.checklists({ id: 1 }),
      );
    });
    it('should creating return true', () => {
      expect(
        CHECKITEMS_CONFIG.isLoading.creating.getter(false, false, true),
      ).toEqual(true);
    });
    it('should creating return false', () => {
      expect(
        CHECKITEMS_CONFIG.isLoading.creating.getter(false, false, false),
      ).toEqual(false);
    });
  });
});
