/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import { EVENT_STORE_CACHE_KEYS } from 'datastore/eventStore/cacheKey';

describe('datastore/eventStore/constants', () => {
  describe('#filterFlightBookingsByTemplateId', () => {
    it('returns correct key', () => {
      const obj = { idsProp: 'idsProp', templateIdProp: 'templateIdProp' };
      const props = {
        [obj.idsProp]: [1, 2],
        [obj.templateIdProp]: 3,
      };
      expect(
        EVENT_STORE_CACHE_KEYS.filterFlightBookingsByTemplateId(obj)(props),
      ).toMatchSnapshot();
    });

    it('returns correct key if no props', () => {
      expect(
        EVENT_STORE_CACHE_KEYS.filterFlightBookingsByTemplateId({})({}),
      ).toMatchSnapshot();
    });
  });

  describe('#filterEventsByFlightBookingDataId', () => {
    it('returns correct key', () => {
      const obj = {
        eventStartTimesProp: 'eventStartTimesProp',
        eventDataIdsProp: 'eventDataIdsProp',
        flightBookingDataIdProp: 'flightBookingDataIdProp',
        allFlightsProp: 'allFlightsProp',
      };
      const props = {
        [obj.eventStartTimesProp]: [1],
        [obj.eventDataIdsProp]: [2],
        [obj.allFlights]: true,
        [obj.flightBookingDataIdProp]: [3],
      };
      expect(
        EVENT_STORE_CACHE_KEYS.filterEventsByFlightBookingDataId(obj)(props),
      ).toMatchSnapshot();
    });

    it('returns correct key if no props', () => {
      expect(
        EVENT_STORE_CACHE_KEYS.filterEventsByFlightBookingDataId({})({}),
      ).toMatchSnapshot();
    });
  });
});
