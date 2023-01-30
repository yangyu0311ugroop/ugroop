import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import { CONFIG } from '../config';

describe('Locations/config.js', () => {
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

    describe('eventPickup', () => {
      it('should return a particular array shape', () => {
        expect(CONFIG.setValue.eventPickup({ dataId: 1 })).toMatchSnapshot();
      });
    });

    describe('eventDropoff', () => {
      it('should return a particular array shape', () => {
        expect(CONFIG.setValue.eventDropoff({ dataId: 1 })).toMatchSnapshot();
      });
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('dropoffPlaceId', () => {
      it('should return a particular shape of array', () => {
        expect(CONFIG.value.dropoffPlaceId({ dataId: 1 })).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.transportationDetailEndPlaceId,
          }),
        );
      });
    });

    describe('type', () => {
      it('should return a particular shape of an array', () => {
        expect(CONFIG.value.type({ dataId: 1 })).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.type,
          }),
        );
      });
    });

    describe('subtype', () => {
      it('should return a particular shape of an array', () => {
        expect(CONFIG.value.subtype({ dataId: 1 })).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.subtype,
          }),
        );
      });
    });

    describe('value', () => {
      it('should return a particular shape of an array', () => {
        expect(CONFIG.value.value({ activityDetailId: 1 })).toEqual(
          EVENT_STORE_DATA_SELECTORS.activityDetailProp({
            id: 1,
            path: EVENT_PATHS.activityDetailValue,
          }),
        );
      });
    });

    describe('dropoffName', () => {
      it('should return a particular shape of array', () => {
        expect(CONFIG.value.dropoffName({ dataId: 1 })).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.transportationDetailEndName,
          }),
        );
      });
    });

    describe('dropoffIcon', () => {
      it('should return a particular shape of array', () => {
        expect(CONFIG.value.dropoffIcon({ dataId: 1 })).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.transportationDetailEndIcon,
          }),
        );
      });
    });

    describe('pickupName', () => {
      it('should return a particular shape of array', () => {
        expect(CONFIG.value.pickupName({ dataId: 1 })).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.transportationDetailStartName,
          }),
        );
      });
    });

    describe('pickupPlaceId', () => {
      it('should return a particular shape of array', () => {
        expect(CONFIG.value.pickupPlaceId({ dataId: 1 })).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.transportationDetailStartPlaceId,
          }),
        );
      });
    });

    describe('pickupIcon', () => {
      it('should return a particular shape of array', () => {
        expect(CONFIG.value.pickupIcon({ dataId: 1 })).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.transportationDetailStartIcon,
          }),
        );
      });
    });
  });
});
