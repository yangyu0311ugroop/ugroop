/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';

describe('datastore/eventStore/helpers', () => {
  describe('#pathToEventInputName', () => {
    it('returns correct name', () => {
      const path = 'some.path';
      expect(EVENT_STORE_HELPERS.pathToEventInputName(path)).toEqual(
        'data.some.path',
      );
    });
  });

  describe('#pathToTempInputName', () => {
    it('returns correct name', () => {
      const path = 'some.path';
      expect(EVENT_STORE_HELPERS.pathToTempInputName(path)).toEqual(
        'temp.some.path',
      );
    });
  });

  describe('#pathToFlightBookingInputName', () => {
    it('returns correct name', () => {
      const path = 'some.path';
      expect(EVENT_STORE_HELPERS.pathToFlightBookingInputName(path)).toEqual(
        'some.path',
      );
    });
  });

  describe('#renderHomeTime', () => {
    it('renders correct time', () => {
      const dateTime = MOMENT_HELPERS.setTimeZone(
        MOMENT_HELPERS.createUtc('2018-01-01T12:00:00.000Z'),
        'Asia/Tokyo',
      );
      const timeZoneId = 'Europe/Paris';
      expect(EVENT_STORE_HELPERS.renderHomeTime(dateTime, timeZoneId)).toEqual(
        '04:00 CET',
      );
    });

    it('renders correct prehistoric time', () => {
      const dateTime = MOMENT_HELPERS.setTimeZone(
        MOMENT_HELPERS.createUtc('0001-01-01T12:00:00.000Z'),
        'Asia/Tokyo',
      );
      const setDate = MOMENT_HELPERS.setDate;
      MOMENT_HELPERS.setDate = jest.fn(() =>
        MOMENT_HELPERS.setTimeZone(
          MOMENT_HELPERS.createUtc('2018-01-01T12:00:00.000Z'),
          'Asia/Tokyo',
        ),
      );
      const timeZoneId = 'Europe/Paris';
      expect(EVENT_STORE_HELPERS.renderHomeTime(dateTime, timeZoneId)).toEqual(
        '04:00 CET',
      );
      MOMENT_HELPERS.setDate = setDate;
    });

    it('renders previous day correctly', () => {
      const dateTime = MOMENT_HELPERS.setTimeZone(
        MOMENT_HELPERS.createUtc('2018-01-02T00:00:00.000Z'),
        'Asia/Tokyo',
      );
      const timeZoneId = 'Europe/Paris';
      expect(EVENT_STORE_HELPERS.renderHomeTime(dateTime, timeZoneId)).toEqual(
        '-1 day at 16:00 CET',
      );
    });

    it('renders next day correctly', () => {
      const dateTime = MOMENT_HELPERS.setTimeZone(
        MOMENT_HELPERS.createUtc('2018-01-02T20:00:00.000Z'),
        'Europe/Paris',
      );
      const timeZoneId = 'Asia/Tokyo';
      expect(EVENT_STORE_HELPERS.renderHomeTime(dateTime, timeZoneId)).toEqual(
        '+1 day at 04:00 JST',
      );
    });

    it('renders null if same timeZone', () => {
      const timeZoneId = 'Europe/Paris';
      const dateTime = MOMENT_HELPERS.setTimeZone(
        MOMENT_HELPERS.createUtc('0001-01-01T12:00:00.000Z'),
        timeZoneId,
      );
      expect(
        EVENT_STORE_HELPERS.renderHomeTime(dateTime, timeZoneId),
      ).toBeNull();
    });

    it('renders null if no date', () => {
      expect(EVENT_STORE_HELPERS.renderHomeTime()).toBeNull();
    });
  });

  describe('#setEventCreate', () => {
    it('still matches snapshot', () => {
      Date.now = jest.fn(() => 'now');
      expect(
        EVENT_STORE_HELPERS.setEventCreate('open', 'dayId', 'onOpen'),
      ).toMatchSnapshot();
    });
  });

  describe('#setEventView', () => {
    it('still matches snapshot', () => {
      Date.now = jest.fn(() => 'now');
      expect(EVENT_STORE_HELPERS.setEventView('open', 'id')).toMatchSnapshot();
    });
  });

  describe('#setEventEdit', () => {
    it('still matches snapshot', () => {
      Date.now = jest.fn(() => 'now');
      expect(
        EVENT_STORE_HELPERS.setEventEdit('open', 'id', 'onOpen'),
      ).toMatchSnapshot();
    });
  });

  describe('#setFlightBookingCreate', () => {
    it('still matches snapshot', () => {
      Date.now = jest.fn(() => 'now');
      expect(
        EVENT_STORE_HELPERS.setFlightBookingCreate('open', 'onCreate'),
      ).toMatchSnapshot();
    });
  });

  describe('#setFlightBookingView', () => {
    it('still matches snapshot', () => {
      Date.now = jest.fn(() => 'now');
      expect(
        EVENT_STORE_HELPERS.setFlightBookingView('open', 'onCreate'),
      ).toMatchSnapshot();
    });
  });

  describe('#setFlightBookingEdit', () => {
    it('still matches snapshot', () => {
      Date.now = jest.fn(() => 'now');
      expect(
        EVENT_STORE_HELPERS.setFlightBookingEdit('open', 'dataId'),
      ).toMatchSnapshot();
    });
  });
});
