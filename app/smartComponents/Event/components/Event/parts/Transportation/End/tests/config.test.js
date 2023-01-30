import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { CONFIG } from '../config';

describe('EndLocation/config.js', () => {
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
      it('should match a particular selector shape', () => {
        const selector = CONFIG.setValue.eventDropoff({ dataId: 1 });

        expect(selector).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: ['calculated', 'dropoff', 'placeId'],
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

    describe('placeId', () => {
      it('should return a particular array shape', () => {
        expect(CONFIG.value.placeId({ dataId: 1 })).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.transportationDetailEndPlaceId,
          }),
        );
      });
    });

    describe('name', () => {
      it('should return a particular array shape', () => {
        expect(CONFIG.value.name({ dataId: 1 })).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.transportationDetailEndName,
          }),
        );
      });
    });

    describe('icon', () => {
      it('should return a particular array shape', () => {
        expect(CONFIG.value.icon({ dataId: 1 })).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.transportationDetailEndIcon,
          }),
        );
      });
    });
  });
});
