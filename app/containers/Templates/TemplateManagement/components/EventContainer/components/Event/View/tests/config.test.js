/**
 * Created by stephenkarpinskyj on 24/10/18.
 */

import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import {
  EVENT_STORE_VIEW_SELECTORS,
  EVENT_STORE_DATA_SELECTORS,
} from 'datastore/eventStore/selectors';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import {
  CONFIG_IDS,
  CONFIG_DATA,
  CONFIG_DATA_SET_VALUE,
  CONFIG_ACTIVITY_DETAILS,
  CONFIG_FLIGHT_DATA,
  CONFIG_TRANSPORTATION_DATA,
} from '../config';

describe('EventContainer/Event/View/config', () => {
  describe('CONFIG_ACTIVITY_DETAILS', () => {
    it('exists', () => {
      expect(CONFIG_ACTIVITY_DETAILS).toBeDefined();
    });

    describe('#value', () => {
      it('contains required properties', () => {
        const props = { activityDetailStart: 1, activityDetailEnd: 1 };

        expect(
          CONFIG_ACTIVITY_DETAILS.value.activityDetailEndValue(props),
        ).toEqual(
          EVENT_STORE_DATA_SELECTORS.activityDetailProp({
            id: 1,
            path: EVENT_PATHS.activityDetailValue,
          }),
        );

        expect(
          CONFIG_ACTIVITY_DETAILS.value.activityDetailStartValue(props),
        ).toEqual(
          EVENT_STORE_DATA_SELECTORS.activityDetailProp({
            id: 1,
            path: EVENT_PATHS.activityDetailValue,
          }),
        );
      });
    });
  });

  describe('CONFIG_FLIGHT_DATA', () => {
    it('exists', () => {
      expect(CONFIG_ACTIVITY_DETAILS).toBeDefined();
    });

    describe('#value', () => {
      it('contains required properties', () => {
        const props = { dataId: 1 };

        expect(CONFIG_FLIGHT_DATA.value.startAirportName(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.startAirportName,
          }),
        );

        expect(CONFIG_FLIGHT_DATA.value.startAirportCity(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.startCityName,
          }),
        );

        expect(CONFIG_FLIGHT_DATA.value.startIataCode(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.startIataCode,
          }),
        );

        expect(CONFIG_FLIGHT_DATA.value.endAirportName(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.endAirportName,
          }),
        );

        expect(CONFIG_FLIGHT_DATA.value.endAirportCity(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.endCityName,
          }),
        );

        expect(CONFIG_FLIGHT_DATA.value.endIataCode(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.endIataCode,
          }),
        );

        expect(CONFIG_FLIGHT_DATA.value.airline(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.airline,
          }),
        );

        expect(CONFIG_FLIGHT_DATA.value.flightNumber(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.flightNumber,
          }),
        );

        expect(CONFIG_FLIGHT_DATA.value.gate(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.gate,
          }),
        );

        expect(CONFIG_FLIGHT_DATA.value.terminal(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.terminal,
          }),
        );

        expect(CONFIG_FLIGHT_DATA.value.flightTravelClass(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.flightTravelClass,
          }),
        );

        expect(CONFIG_FLIGHT_DATA.value.flightBooking(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.flightBooking,
          }),
        );
      });
    });
  });

  describe('CONFIG_TRANSPORTATION_DATA', () => {
    it('exists', () => {
      expect(CONFIG_ACTIVITY_DETAILS).toBeDefined();
    });

    describe('#value', () => {
      it('contains required properties', () => {
        const props = { dataId: 1 };

        expect(CONFIG_TRANSPORTATION_DATA.value.startName(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.transportationDetailStartName,
          }),
        );

        expect(CONFIG_TRANSPORTATION_DATA.value.startPlaceId(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.transportationDetailStartPlaceId,
          }),
        );

        expect(CONFIG_TRANSPORTATION_DATA.value.startIcon(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.transportationDetailStartIcon,
          }),
        );

        expect(CONFIG_TRANSPORTATION_DATA.value.endName(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.transportationDetailEndName,
          }),
        );

        expect(CONFIG_TRANSPORTATION_DATA.value.endPlaceId(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.transportationDetailEndPlaceId,
          }),
        );

        expect(CONFIG_TRANSPORTATION_DATA.value.endIcon(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.transportationDetailEndIcon,
          }),
        );

        expect(
          CONFIG_TRANSPORTATION_DATA.value.transportationDetailBookerName(
            props,
          ),
        ).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.transportationDetailBookerName,
          }),
        );

        expect(
          CONFIG_TRANSPORTATION_DATA.value.transportationDetailBookingNumber(
            props,
          ),
        ).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.transportationDetailBookingNumber,
          }),
        );

        expect(
          CONFIG_TRANSPORTATION_DATA.value.transportationDetailBookingPersonCount(
            props,
          ),
        ).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.transportationDetailBookingPersonCount,
          }),
        );

        expect(
          CONFIG_TRANSPORTATION_DATA.value.transportationDetailSupplierName(
            props,
          ),
        ).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.transportationDetailSupplierName,
          }),
        );

        expect(
          CONFIG_TRANSPORTATION_DATA.value.transportationDetailSupplierPhone(
            props,
          ),
        ).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.transportationDetailSupplierPhone,
          }),
        );
      });
    });
  });

  describe('CONFIG_IDS', () => {
    it('exists', () => {
      expect(CONFIG_IDS).toBeDefined();
    });

    describe('#value', () => {
      it('contains required properties', () => {
        expect(CONFIG_IDS.value.dataId).toEqual(
          NODE_STORE_SELECTORS.eventDataId,
        );
        expect(CONFIG_IDS.value.trail).toEqual(NODE_STORE_SELECTORS.trail);
      });
    });
  });

  describe('CONFIG_DATA', () => {
    it('exists', () => {
      expect(CONFIG_IDS).toBeDefined();
    });

    describe('#value', () => {
      it('contains required properties', () => {
        const props = { dataId: 'dataId', id: 'id', tabId: 'tabId' };

        expect(CONFIG_DATA.value.templateId.getter({ trail: null })).toBe(0);
        expect(CONFIG_DATA.value.templateId.getter({ trail: [1, 2] })).toEqual(
          2,
        );

        expect(CONFIG_DATA.value.type(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: props.dataId,
            path: EVENT_PATHS.type,
          }),
        );
        expect(CONFIG_DATA.value.bookedBy(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: props.dataId,
            path: EVENT_PATHS.bookerName,
          }),
        );
        expect(CONFIG_DATA.value.bookingNumber(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: props.dataId,
            path: EVENT_PATHS.bookingNumber,
          }),
        );
        expect(CONFIG_DATA.value.bookingPersonCount(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: props.dataId,
            path: EVENT_PATHS.bookingPersonCount,
          }),
        );
        expect(CONFIG_DATA.value.supplierName(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: props.dataId,
            path: EVENT_PATHS.supplierName,
          }),
        );
        expect(CONFIG_DATA.value.supplierPhone(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: props.dataId,
            path: EVENT_PATHS.supplierPhone,
          }),
        );
        expect(CONFIG_DATA.value.description(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: props.dataId,
            path: EVENT_PATHS.description,
          }),
        );
        expect(CONFIG_DATA.value.locationIcon(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: props.dataId,
            path: EVENT_PATHS.locationIcon,
          }),
        );
        expect(CONFIG_DATA.value.locationName(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: props.dataId,
            path: EVENT_PATHS.locationName,
          }),
        );
        expect(CONFIG_DATA.value.placeId(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: props.dataId,
            path: EVENT_PATHS.placeId,
          }),
        );
        expect(CONFIG_DATA.value.url(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: props.dataId,
            path: EVENT_PATHS.url,
          }),
        );
        expect(CONFIG_DATA.value.timeZoneId(props)).toEqual(
          NODE_STORE_SELECTORS.nodeProp({
            id: props.id,
            path: NODE_PATHS.startTimeZoneId,
          }),
        );
        expect(CONFIG_DATA.value.calculatedStartTimeValue(props)).toEqual(
          NODE_STORE_SELECTORS.nodeProp({
            id: props.id,
            path: NODE_PATHS.calculatedStartTimeValue,
          }),
        );
        expect(CONFIG_DATA.value.calculatedEndTimeValue(props)).toEqual(
          NODE_STORE_SELECTORS.nodeProp({
            id: props.id,
            path: NODE_PATHS.calculatedEndTimeValue,
          }),
        );
        expect(CONFIG_DATA.value.dayIds(props)).toEqual(
          NODE_STORE_SELECTORS.nodeProp({
            id: props.tabId,
            path: NODE_PATHS.children,
          }),
        );
        expect(CONFIG_DATA.value.startDate(props)).toEqual(
          NODE_STORE_SELECTORS.nodeProp({
            id: props.tabId,
            path: NODE_PATHS.calculatedStartTimeValue,
          }),
        );
        expect(CONFIG_DATA.value.eventIds(props)).toEqual(
          NODE_STORE_SELECTORS.calculatedNodesEvents({
            id: 0,
          }),
        );
        expect(CONFIG_DATA.value.subtype(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: props.dataId,
            path: EVENT_PATHS.subtype,
          }),
        );
        expect(CONFIG_DATA.value.name(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: props.dataId,
            path: EVENT_PATHS.name,
          }),
        );

        expect(CONFIG_DATA.value.iconOverride({ dataId: 1 })).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: 1,
            path: EVENT_PATHS.iconOverride,
          }),
        );
      });
    });
  });

  describe('CONFIG_DATA_SET_VALUE', () => {
    describe('#setValue', () => {
      it('contains required properties', () => {
        expect(CONFIG_DATA_SET_VALUE.setValue.eventEdit).toEqual(
          EVENT_STORE_VIEW_SELECTORS.eventEdit,
        );
      });
    });
  });
});
