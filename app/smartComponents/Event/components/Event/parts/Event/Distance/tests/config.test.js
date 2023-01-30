import { USER_PREFERENCE } from 'appConstants';
import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import { USERS_PREFERENCE_SELECTORS } from 'datastore/userStore/selectors';
import { CONFIG, GET_PREFERRED_MEASUREMENT } from '../config';

describe('Distance/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('eventDistance', () => {
      it('should return a particular selector shape', () => {
        expect(CONFIG.value.eventDistance({ dataId: 1 })).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: ['calculated', 'distance'],
          }),
        );
      });
    });
  });
});

describe('Distance/GET_PREFERRED_MEASUREMENT', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof GET_PREFERRED_MEASUREMENT).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof GET_PREFERRED_MEASUREMENT.value).toBe('object');
    });

    describe('measurement', () => {
      it('should return a particular selector shape', () => {
        expect(
          GET_PREFERRED_MEASUREMENT.value.measurement({ userId: 1 }),
        ).toEqual(
          USERS_PREFERENCE_SELECTORS.getUserPreference({
            id: 1,
            key: USER_PREFERENCE.PREFERRED_DISTANCE_MEASUREMENT,
          }),
        );
      });
    });
  });
});
