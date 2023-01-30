import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG, CONFIG_EVENT_DATA } from '../config';

describe('Event/config.js', () => {
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
      expect(typeof CONFIG_EVENT_DATA.value).toBe('object');
    });

    describe('event', () => {
      it('should exists', () => {
        expect(CONFIG_EVENT_DATA.value.event({ dataId: 999 })).toEqual(
          EVENT_STORE_DATA_SELECTORS.event({ id: 999 }),
        );
      });
    });

    describe('tabId', () => {
      it('should exists', () => {
        expect(CONFIG_EVENT_DATA.value.tabId({ templateId: 999 })).toEqual(
          NODE_STORE_SELECTORS.calculatedTimelineId({ id: 999 }),
        );
      });
    });
  });
});
