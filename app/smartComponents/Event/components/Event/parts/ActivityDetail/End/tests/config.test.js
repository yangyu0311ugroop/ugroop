import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { CONFIG } from '../config';

describe('End/config.js', () => {
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

    describe('eventDropoff', () => {
      it('should return a particular shape of selector', () => {
        const selector = CONFIG.setValue.eventDropoff({ dataId: 1 });

        expect(selector).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: ['calculated', 'dropoff', 'placeId'],
          }),
        );
      });
    });

    describe('eventDistance', () => {
      it('should return an array of selector', () => {
        const selector = CONFIG.setValue.eventDistance({ dataId: 1 });

        expect(selector).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: ['calculated', 'distance'],
          }),
        );
      });
    });
  });

  describe('value', () => {
    it('should exists', () => {
      const props = { id: 'id' };
      expect(typeof CONFIG.value).toBe('object');
      expect(CONFIG.value.timeZoneId(props)).toEqual(
        EVENT_STORE_DATA_SELECTORS.eventProp({
          id: props.id,
          path: NODE_PATHS.endTimeZoneId,
        }),
      );
    });

    describe('key', () => {
      it('should return a particular array shape', () => {
        expect(CONFIG.value.key({ activityDetailId: 1 })).toEqual(
          EVENT_STORE_DATA_SELECTORS.activityDetailProp({
            id: 1,
            path: EVENT_PATHS.activityDetailKey,
          }),
        );
      });
    });

    describe('value', () => {
      it('should return a particular array shape', () => {
        expect(CONFIG.value.value({ activityDetailId: 1 })).toEqual(
          EVENT_STORE_DATA_SELECTORS.activityDetailProp({
            id: 1,
            path: EVENT_PATHS.activityDetailValue,
          }),
        );
      });
    });
  });
});
