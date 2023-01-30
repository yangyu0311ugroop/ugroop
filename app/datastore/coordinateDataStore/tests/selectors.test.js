import { COORDINATE_DATA_STORE_SELECTORS } from '../selectors';
import { COORDINATE_DATA_STORE } from '../../../appConstants';
describe('selector', () => {
  describe('ids', () => {
    it('to match', () => {
      expect(COORDINATE_DATA_STORE_SELECTORS.ids()).toEqual([
        COORDINATE_DATA_STORE,
        'recentActivityIds',
      ]);
    });
  });
  describe('lastUpdate', () => {
    it('to match', () => {
      expect(COORDINATE_DATA_STORE_SELECTORS.lastUpdate({ id: 1 })).toEqual([
        COORDINATE_DATA_STORE,
        'recentActivities',
        1,
        'updatedat',
      ]);
    });
  });
  describe('lastAccess', () => {
    it('to match', () => {
      expect(COORDINATE_DATA_STORE_SELECTORS.lastAccess({ id: 1 })).toEqual([
        COORDINATE_DATA_STORE,
        'userActivities',
        1,
        'lastaccessat',
      ]);
    });
  });
  describe('action', () => {
    it('to match', () => {
      expect(COORDINATE_DATA_STORE_SELECTORS.action({ id: 1 })).toEqual([
        COORDINATE_DATA_STORE,
        'recentActivities',
        1,
        'action',
      ]);
    });
  });
  describe('actionObjType', () => {
    it('to match', () => {
      expect(COORDINATE_DATA_STORE_SELECTORS.actionObjType({ id: 1 })).toEqual([
        COORDINATE_DATA_STORE,
        'recentActivities',
        1,
        'targetType',
      ]);
    });
  });
});
