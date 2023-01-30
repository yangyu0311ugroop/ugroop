/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import {
  EVENT_STORE_VIEW_SELECTORS,
  EVENT_STORE_DATA_SELECTORS,
} from 'datastore/eventStore/selectors';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { CONFIG_1, CONFIG_2 } from '../config';

describe('smartComponents/Event/parts/Flight/Booking/config', () => {
  describe('CONFIG_1', () => {
    it('exists', () => {
      expect(CONFIG_1).toBeDefined();
    });

    describe('#value', () => {
      it('contains required properties', () => {
        const props = {
          dataId: 'dataId',
        };
        const { value } = CONFIG_1();
        expect(value.value(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: props.dataId,
            path: EVENT_PATHS.flightBooking,
          }),
        );
        expect(value.flightBookingIds).toEqual(
          EVENT_STORE_DATA_SELECTORS.flightBookingIds,
        );
      });
    });
  });

  describe('CONFIG_2', () => {
    it('exists', () => {
      expect(CONFIG_2).toBeDefined();
    });

    describe('#value', () => {
      it('contains required properties', () => {
        EVENT_STORE_DATA_SELECTORS.filterFlightBookingsByTemplateId = jest.fn(
          (...args) => ['filterFlightBookingsByTemplateId', ...args],
        );
        const { value } = CONFIG_2();
        expect(value.formValue).toEqual(
          EVENT_STORE_VIEW_SELECTORS.eventFormProp({
            path: EVENT_PATHS.flightBooking,
          }),
        );
        expect(value.flightBookingIds).toEqual(
          EVENT_STORE_DATA_SELECTORS.filterFlightBookingsByTemplateId({
            idsProp: 'flightBookingIds',
          }),
        );
      });
    });

    describe('#setValue', () => {
      it('contains required properties', () => {
        const { setValue } = CONFIG_2();
        expect(setValue.flightBookingCreate).toEqual(
          EVENT_STORE_VIEW_SELECTORS.flightBookingCreate,
        );
        expect(setValue.flightBookingView).toEqual(
          EVENT_STORE_VIEW_SELECTORS.flightBookingView,
        );
        expect(setValue.flightBookingEdit).toEqual(
          EVENT_STORE_VIEW_SELECTORS.flightBookingEdit,
        );
      });
    });
  });
});
