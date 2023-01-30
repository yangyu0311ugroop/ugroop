import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG_TAB_ID, CONFIG } from '../config';

describe('MiniCalendar/config.js', () => {
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
    it('should have dayIds', () => {
      expect(CONFIG.value.dayIds({ tabId: 1 })).toEqual(
        NODE_STORE_SELECTORS.children({ id: 1 }),
      );
    });
    it('should have weekDay', () => {
      expect(CONFIG.value.weekDay({ templateId: 1 })).toEqual(
        NODE_STORE_SELECTORS.weekDay({ id: 1 }),
      );
    });
    it('should have startDate', () => {
      expect(CONFIG.value.startDate({ templateId: 1 })).toEqual(
        NODE_STORE_SELECTORS.startDate({ id: 1 }),
      );
    });
    it('should have displayDate', () => {
      expect(CONFIG.value.displayDate({ templateId: 1 })).toEqual(
        NODE_STORE_SELECTORS.displayDate({ id: 1 }),
      );
    });
    it('should have duration', () => {
      expect(CONFIG.value.duration({ templateId: 1 })).toEqual(
        NODE_STORE_SELECTORS.duration({ id: 1 }),
      );
    });
  });

  describe('CONFIG_TAB_ID', () => {
    it('value', () => {
      expect(CONFIG_TAB_ID.value.tabId({ templateId: 12 })).toEqual(
        NODE_STORE_SELECTORS.calculatedTimelineId({ id: 12 }),
      );
    });
  });
});
