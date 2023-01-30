/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import { EVENT_STORE_UTILS } from '../utils';

describe('datastore/eventStore/utils', () => {
  describe('#filterEventsByFlightBookingDataIdReducer', () => {
    it('appends id if matches dataId', () => {
      const dataId = 1;
      const acc = [];
      const startTime = 'startTime';
      const currentDataId = '1';
      const result = EVENT_STORE_UTILS.filterEventsByFlightBookingDataIdReducer(
        dataId,
      )(acc, [startTime, currentDataId]);
      expect(result).toEqual([startTime]);
    });

    it('not appends id if not matches dataId', () => {
      const dataId = 1;
      const acc = 'acc';
      const startTime = 'startTime';
      const currentDataId = '2';
      const result = EVENT_STORE_UTILS.filterEventsByFlightBookingDataIdReducer(
        dataId,
      )(acc, [startTime, currentDataId]);
      expect(result).toBe(acc);
    });

    it('not appends id if no time', () => {
      const dataId = 1;
      const acc = 'acc';
      const startTime = null;
      const currentDataId = '2';
      const result = EVENT_STORE_UTILS.filterEventsByFlightBookingDataIdReducer(
        dataId,
      )(acc, [startTime, currentDataId]);
      expect(result).toBe(acc);
    });
  });

  describe('#filterFlightBookingByTemplateIdReducer', () => {
    it('appends id if matches templateId', () => {
      const templateId = 1;
      const acc = [];
      const id = 'id';
      const currentTemplateId = 1;
      const result = EVENT_STORE_UTILS.filterFlightBookingByTemplateIdReducer(
        templateId,
      )(acc, [id, currentTemplateId]);
      expect(result).toEqual([id]);
    });

    it('not appends id if not matches templateId', () => {
      const templateId = 1;
      const acc = 'acc';
      const id = 'id';
      const currentTemplateId = 2;
      const result = EVENT_STORE_UTILS.filterFlightBookingByTemplateIdReducer(
        templateId,
      )(acc, [id, currentTemplateId]);
      expect(result).toEqual(acc);
    });
  });
});
