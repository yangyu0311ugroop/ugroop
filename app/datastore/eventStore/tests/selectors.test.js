/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import { EVENT_STORE } from 'appConstants';
import {
  EVENT_STORE_SELECTORS,
  EVENT_STORE_VIEW_SELECTORS,
  EVENT_STORE_DATA_SELECTORS,
} from 'datastore/eventStore/selectors';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { EVENT_PATHS } from '../constants';
import { EVENT_STORE_UTILS } from '../utils';
import { EVENT_STORE_CACHE_KEYS } from '../cacheKey';

describe('datastore/eventStore/selectors', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('#EVENT_STORE_VIEW_SELECTORS', () => {
    describe('#eventCreate', () => {
      it('returns correct keyPath', () => {
        expect(EVENT_STORE_VIEW_SELECTORS.eventCreate).toEqual([
          EVENT_STORE,
          'view',
          'eventCreate',
        ]);
      });
    });

    describe('#eventView', () => {
      it('returns correct keyPath', () => {
        expect(EVENT_STORE_VIEW_SELECTORS.eventView).toEqual([
          EVENT_STORE,
          'view',
          'eventView',
        ]);
      });
    });

    describe('#eventEdit', () => {
      it('returns correct keyPath', () => {
        expect(EVENT_STORE_VIEW_SELECTORS.eventEdit).toEqual([
          EVENT_STORE,
          'view',
          'eventEdit',
        ]);
      });
    });

    describe('#eventForm', () => {
      it('returns correct keyPath', () => {
        expect(EVENT_STORE_VIEW_SELECTORS.eventForm).toEqual([
          EVENT_STORE,
          'form',
          'event',
        ]);
      });
    });

    describe('#eventFormProp', () => {
      it('returns correct keyPath', () => {
        const props = { path: ['some', 'path'] };
        expect(EVENT_STORE_VIEW_SELECTORS.eventFormProp(props)).toEqual([
          EVENT_STORE,
          'form',
          'event',
          ...props.path,
        ]);
      });
    });

    describe('#flightBookingCreate', () => {
      it('returns correct keyPath', () => {
        expect(EVENT_STORE_VIEW_SELECTORS.flightBookingCreate).toEqual([
          EVENT_STORE,
          'view',
          'flightBookingCreate',
        ]);
      });
    });

    describe('#flightBookingView', () => {
      it('returns correct keyPath', () => {
        expect(EVENT_STORE_VIEW_SELECTORS.flightBookingView).toEqual([
          EVENT_STORE,
          'view',
          'flightBookingView',
        ]);
      });
    });

    describe('#flightBookingEdit', () => {
      it('returns correct keyPath', () => {
        expect(EVENT_STORE_VIEW_SELECTORS.flightBookingEdit).toEqual([
          EVENT_STORE,
          'view',
          'flightBookingEdit',
        ]);
      });
    });

    describe('#flightBookingFormProp', () => {
      it('returns correct keyPath', () => {
        const props = { path: ['some', 'path'] };
        expect(EVENT_STORE_VIEW_SELECTORS.flightBookingFormProp(props)).toEqual(
          [EVENT_STORE, 'form', 'flightBooking', ...props.path],
        );
      });
    });

    describe('coachViewProp', () => {
      it('should return expected keyPath', () => {
        const props = { path: 'sample' };
        expect(EVENT_STORE_VIEW_SELECTORS.coachViewProp(props)).toEqual([
          ...EVENT_STORE_VIEW_SELECTORS.coachView,
          'sample',
        ]);
      });
    });

    describe('coachFormProp', () => {
      it('should return expected keyPath', () => {
        const props = { path: 'sample' };
        expect(EVENT_STORE_VIEW_SELECTORS.coachFormProp(props)).toEqual([
          EVENT_STORE,
          'form',
          'coach',
          'sample',
        ]);
      });
    });
  });

  describe('#EVENT_STORE_DATA_SELECTORS', () => {
    describe('#events', () => {
      it('returns correct keyPath', () => {
        expect(EVENT_STORE_DATA_SELECTORS.events).toEqual([
          EVENT_STORE,
          'events',
        ]);
      });
    });

    describe('#event', () => {
      it('returns correct keyPath', () => {
        const props = { id: 'id' };
        expect(EVENT_STORE_DATA_SELECTORS.event(props)).toEqual([
          EVENT_STORE,
          'events',
          props.id,
        ]);
      });
    });

    describe('#eventProp', () => {
      it('returns correct keyPath', () => {
        const props = { id: 'id', path: ['some', 'path'] };
        expect(EVENT_STORE_DATA_SELECTORS.eventProp(props)).toEqual([
          EVENT_STORE,
          'events',
          props.id,
          ...props.path,
        ]);
      });
    });

    describe('#eventType', () => {
      it('returns correct keyPath', () => {
        expect(EVENT_STORE_DATA_SELECTORS.eventType({ id: 1122 })).toEqual([
          ...EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1122,
            path: EVENT_PATHS.type,
          }),
        ]);
      });
    });

    describe('#cancellation', () => {
      it('returns correct keyPath', () => {
        expect(EVENT_STORE_DATA_SELECTORS.cancellation({ id: 1122 })).toEqual([
          ...EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1122,
            path: EVENT_PATHS.cancellation,
          }),
        ]);
      });
    });

    describe('#eventSubtype', () => {
      it('returns correct keyPath', () => {
        expect(EVENT_STORE_DATA_SELECTORS.eventSubtype({ id: 1122 })).toEqual([
          ...EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1122,
            path: EVENT_PATHS.subtype,
          }),
        ]);
      });
    });

    describe('#cachedEvent', () => {
      let cachedEvent;

      beforeEach(() => {
        cachedEvent = EVENT_STORE_DATA_SELECTORS.cachedEvent;
      });

      it('returns correct keyPath', () => {
        const props = { dataId: 2 };
        expect(cachedEvent.keyPath(props)).toEqual([
          EVENT_STORE,
          'events',
          props.dataId,
        ]);
      });

      it('returns correct cacheKey', () => {
        const props = { dataId: 2 };
        expect(cachedEvent.cacheKey(props)).toEqual(
          `event.${props.dataId}.cachedEvent`,
        );
      });

      it('returns correct props', () => {
        expect(cachedEvent.props).toBeNull();
      });

      it('getter calls reducer', () => {
        const ev = 'ev';
        expect(cachedEvent.getter(ev)).toBe(ev);
      });
    });

    describe('#hasAttendance', () => {
      let hasAttendance;

      beforeEach(() => {
        hasAttendance = EVENT_STORE_DATA_SELECTORS.hasAttendance();
      });

      it('returns correct keyPath', () => {
        const props = { dataId: 'dataId' };
        expect(hasAttendance.keyPath(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: props.dataId,
            path: EVENT_PATHS.attendance,
          }),
        );
      });

      it('returns correct props', () => {
        expect(hasAttendance.props).toBeNull();
      });

      it('getter returns whether any values are true', () => {
        const attendance = { x: true };
        expect(hasAttendance.getter(attendance)).toBe(true);
      });
    });

    describe('addSubtypes()', () => {
      const addSubtypes = EVENT_STORE_DATA_SELECTORS.addSubtypes({});

      describe('keyPath()', () => {
        it('should addSubtypes()', () => {
          EVENT_STORE_DATA_SELECTORS.eventSubtype = jest.fn(
            () => 'eventSubtype',
          );

          TEST_HELPERS.expectMatchSnapshot(addSubtypes.keyPath, [
            { events: [1, 2] },
          ]);
        });
      });

      describe('cacheKey()', () => {
        it('should addSubtypes() no events', () => {
          TEST_HELPERS.expectMatchSnapshot(addSubtypes.cacheKey, [{}]);
        });

        it('should addSubtypes()', () => {
          TEST_HELPERS.expectMatchSnapshot(addSubtypes.cacheKey, [
            { events: [{ dataId: 1 }, { dataId: 2 }] },
          ]);
        });
      });

      describe('props()', () => {
        it('should addSubtypes() no events', () => {
          TEST_HELPERS.expectMatchSnapshot(addSubtypes.props, [
            { events: [1] },
          ]);
        });
      });

      describe('getter()', () => {
        it('should addSubtypes()', () => {
          expect(
            addSubtypes.getter('HOTEL', [{ hotel: 'hotel' }]),
          ).toMatchSnapshot();
        });
      });
    });

    describe('#filterEventsByFlightBookingDataId', () => {
      let filterEventsByFlightBookingDataId;

      beforeEach(() => {
        filterEventsByFlightBookingDataId = EVENT_STORE_DATA_SELECTORS.filterEventsByFlightBookingDataId(
          {},
        );
      });

      it('returns correct keyPath', () => {
        const props = { eventDataIds: [1, 2] };
        expect(filterEventsByFlightBookingDataId.keyPath(props)).toEqual(
          props.eventDataIds.map(id =>
            EVENT_STORE_DATA_SELECTORS.eventProp({
              id,
              path: EVENT_PATHS.flightBooking,
            }),
          ),
        );
      });

      it('returns correct props', () => {
        const props = {
          eventStartTimes: 'eventStartTimes',
          dataId: 'dataId',
          allFlights: 'allFlights',
        };
        expect(
          filterEventsByFlightBookingDataId.props.map(func => func(props)),
        ).toEqual(Object.values(props));
      });

      it('getter returns filtered ids', () => {
        const eventFlightBookings = [];
        const eventStartTimes = [];
        const dataId = 'dataId';
        const args = [...eventFlightBookings, eventStartTimes, dataId];
        EVENT_STORE_UTILS.filterEventsByFlightBookingDataIdReducer = jest.fn(
          () => () => ({ value: { id: 1 } }),
        );
        expect(filterEventsByFlightBookingDataId.getter(args)).toEqual([1]);
      });
    });

    describe('#flightBookings', () => {
      it('returns correct keyPath', () => {
        expect(EVENT_STORE_DATA_SELECTORS.flightBookings).toEqual([
          EVENT_STORE,
          'flightBookings',
        ]);
      });
    });

    describe('#flightBookingIds', () => {
      it('returns correct keyPath', () => {
        expect(EVENT_STORE_DATA_SELECTORS.flightBookingIds).toEqual([
          EVENT_STORE,
          'flightBookingIds',
        ]);
      });
    });

    describe('#flightBookingProp', () => {
      it('returns correct keyPath', () => {
        const props = { id: 'id', path: ['some', 'path'] };
        expect(EVENT_STORE_DATA_SELECTORS.flightBookingProp(props)).toEqual([
          EVENT_STORE,
          'flightBookings',
          props.id,
          ...props.path,
        ]);
      });
    });

    describe('#flightBooking', () => {
      it('returns correct keyPath', () => {
        const props = { id: 'id' };
        expect(EVENT_STORE_DATA_SELECTORS.flightBooking(props)).toEqual([
          EVENT_STORE,
          'flightBookings',
          props.id,
        ]);
      });
    });

    describe('#flightBookingTemplateId', () => {
      it('returns correct keyPath', () => {
        const props = { id: 'id' };
        expect(
          EVENT_STORE_DATA_SELECTORS.flightBookingTemplateId(props),
        ).toEqual([EVENT_STORE, 'flightBookings', props.id, 'templateId']);
      });
    });

    describe('#filterFlightBookingsByTemplateId', () => {
      let filterFlightBookingsByTemplateId;

      beforeEach(() => {
        EVENT_STORE_CACHE_KEYS.filterFlightBookingsByTemplateId = jest.fn(
          (...args) => ['filterFlightBookingsByTemplateId', ...args],
        );
        filterFlightBookingsByTemplateId = EVENT_STORE_DATA_SELECTORS.filterFlightBookingsByTemplateId(
          {},
        );
      });

      it('returns correct keyPath', () => {
        const props = { ids: [1, 2] };
        expect(filterFlightBookingsByTemplateId.keyPath(props)).toEqual(
          props.ids.map(id =>
            EVENT_STORE_DATA_SELECTORS.flightBookingTemplateId({
              id,
            }),
          ),
        );
      });

      it('returns correct cacheKey', () => {
        expect(filterFlightBookingsByTemplateId.cacheKey).toEqual(
          EVENT_STORE_CACHE_KEYS.filterFlightBookingsByTemplateId({
            idsProp: 'ids',
            templateIdProp: 'templateId',
          }),
        );
      });

      it('returns correct props', () => {
        const props = {
          ids: 'ids',
          templateId: 'templateId',
        };
        expect(
          filterFlightBookingsByTemplateId.props.map(func => func(props)),
        ).toEqual(Object.values(props));
      });

      it('getter calls reducer', () => {
        const templateIds = [];
        const ids = [];
        const templateId = 'templateId';
        const args = [...templateIds, ids, templateId];
        EVENT_STORE_UTILS.filterFlightBookingByTemplateIdReducer = jest.fn(
          () => () => 1,
        );
        expect(filterFlightBookingsByTemplateId.getter(args)).toEqual(
          EVENT_STORE_UTILS.filterFlightBookingByTemplateIdReducer()(),
        );
      });
    });
  });

  describe('eventAttachmentProp', () => {
    it('should return expected keyPath', () => {
      const props = {
        id: 1,
        path: 'sample',
      };

      expect(EVENT_STORE_DATA_SELECTORS.eventAttachmentProp(props)).toEqual([
        ...EVENT_STORE_DATA_SELECTORS.eventAttachments,
        1,
        'sample',
      ]);
    });
  });

  describe('eventAttachment', () => {
    it('should return eventAttachment', () => {
      expect(EVENT_STORE_DATA_SELECTORS.eventAttachment({ id: 123 })).toEqual([
        EVENT_STORE,
        'attachments',
        123,
      ]);
    });
  });

  describe('activityDetailProp', () => {
    it('should return expected keyPath', () => {
      const props = {
        id: 1,
        path: 'sample',
      };

      expect(EVENT_STORE_DATA_SELECTORS.activityDetailProp(props)).toEqual([
        ...EVENT_STORE_DATA_SELECTORS.activityDetail,
        1,
        'sample',
      ]);
    });
  });

  describe('ratingViewProp', () => {
    it('should return expected keyPath', () => {
      const result = EVENT_STORE_VIEW_SELECTORS.ratingViewProp({
        path: ['sample'],
      });

      expect(result).toEqual([EVENT_STORE, 'view', 'ratings', 'sample']);
    });
  });

  describe('EVENT_STORE_SELECTORS', () => {
    it('should return attachments', () => {
      expect(EVENT_STORE_SELECTORS.attachments({ id: 1122 })).toEqual([
        EVENT_STORE,
        'events',
        1122,
        'eventAttachments',
      ]);
    });
  });
});
