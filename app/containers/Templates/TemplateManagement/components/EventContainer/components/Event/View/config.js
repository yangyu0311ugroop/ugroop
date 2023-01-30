/**
 * Created by stephenkarpinskyj on 15/8/18.
 */

import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import {
  EVENT_STORE_VIEW_SELECTORS,
  EVENT_STORE_DATA_SELECTORS,
} from 'datastore/eventStore/selectors';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { TEMPLATE_MANAGEMENT_STORE_SELECTORS as TEMPLATE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { NODE_STORE } from 'appConstants';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import dropRight from 'lodash/dropRight';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { PORTAL_HELPERS } from '../../../../../../../Portal/helpers';

export const CONFIG_IDS = {
  value: {
    dataId: NODE_STORE_SELECTORS.eventDataId,
    trail: NODE_STORE_SELECTORS.trail,
    tabId: TEMPLATE_SELECTORS.tabId,
  },
};

const selectNodeProp = (id, path) =>
  NODE_STORE_SELECTORS.nodeProp({ id, path });

export const CONFIG_DATA = {
  value: {
    templateId: {
      getter: ({ trail }) =>
        Array.isArray(trail) ? trail[trail.length - 1] : 0,
    },
    type: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({ id, path: EVENT_PATHS.type }),
    subtype: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({ id, path: EVENT_PATHS.subtype }),
    name: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({ id, path: EVENT_PATHS.name }),
    iconOverride: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.iconOverride,
      }),
    bookingNumber: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.bookingNumber,
      }),
    bookedBy: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.bookerName,
      }),
    bookingPersonCount: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.bookingPersonCount,
      }),
    supplierPhone: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.supplierPhone,
      }),
    supplierName: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.supplierName,
      }),
    description: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.description,
      }),

    // Location
    locationIcon: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.locationIcon,
      }),
    locationName: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.locationName,
      }),
    placeId: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({ id, path: EVENT_PATHS.placeId }),
    url: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({ id, path: EVENT_PATHS.url }),
    timeZoneId: ({ id }) => selectNodeProp(id, NODE_PATHS.startTimeZoneId),
    calculatedStartTimeValue: ({ id }) =>
      selectNodeProp(id, NODE_PATHS.calculatedStartTimeValue),
    calculatedEndTimeValue: ({ id }) =>
      selectNodeProp(id, NODE_PATHS.calculatedEndTimeValue),
    dayIds: ({ tabId }) => [NODE_STORE, 'nodes', tabId, 'children'],
    startDate: ({ tabId }) =>
      NODE_STORE_SELECTORS.calculatedStartTimeValue({ id: tabId }),
    eventIds: ({ trail }) => {
      const templateId = Array.isArray(trail) ? trail[trail.length - 1] : 0;
      return NODE_STORE_SELECTORS.calculatedNodesEvents({ id: templateId });
    },
  },
};

export const CONFIG_ACTIVITY_DETAILS = {
  value: {
    // Activity Details
    activityDetailStartValue: ({ activityDetailStart: id }) =>
      EVENT_STORE_DATA_SELECTORS.activityDetailProp({
        id,
        path: EVENT_PATHS.activityDetailValue,
      }),
    activityDetailEndValue: ({ activityDetailEnd: id }) =>
      EVENT_STORE_DATA_SELECTORS.activityDetailProp({
        id,
        path: EVENT_PATHS.activityDetailValue,
      }),
  },
};

export const CONFIG_FLIGHT_DATA = {
  value: {
    startAirportName: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.startAirportName,
      }),
    startAirportCity: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.startCityName,
      }),
    startIataCode: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.startIataCode,
      }),

    endAirportName: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.endAirportName,
      }),
    endAirportCity: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.endCityName,
      }),
    endIataCode: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.endIataCode,
      }),

    airline: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.airline,
      }),
    flightNumber: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.flightNumber,
      }),
    gate: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.gate,
      }),
    terminal: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.terminal,
      }),
    flightTravelClass: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.flightTravelClass,
      }),
    flightBooking: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.flightBooking,
      }),
  },
};

export const CONFIG_TRANSPORTATION_DATA = {
  value: {
    startName: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.transportationDetailStartName,
      }),
    startPlaceId: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.transportationDetailStartPlaceId,
      }),
    startIcon: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.transportationDetailStartIcon,
      }),

    endName: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.transportationDetailEndName,
      }),
    endPlaceId: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.transportationDetailEndPlaceId,
      }),
    endIcon: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.transportationDetailEndIcon,
      }),

    transportationDetailBookerName: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.transportationDetailBookerName,
      }),
    transportationDetailBookingNumber: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.transportationDetailBookingNumber,
      }),
    transportationDetailBookingPersonCount: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.transportationDetailBookingPersonCount,
      }),
    transportationDetailSupplierName: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.transportationDetailSupplierName,
      }),
    transportationDetailSupplierPhone: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.transportationDetailSupplierPhone,
      }),
  },
};

export const CONFIG_EXISTING_EVENT_DATES = {
  value: {
    displayDate: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.displayDate,
      'templateId',
    ),
    existingEventDates: {
      keyPath: ({ eventIds }) =>
        Array.isArray(eventIds)
          ? eventIds.map(eventId =>
              NODE_STORE_SELECTORS.calculatedStartTimeValue({ id: eventId }),
            )
          : [],
      props: ({ eventIds }) => eventIds,
      getter: (...args) => {
        const values = dropRight(args, 1);
        return values;
      },
    },
  },
};

export const CONFIG_DATA_SET_VALUE = {
  setValue: {
    eventEdit: EVENT_STORE_VIEW_SELECTORS.eventEdit,
    ...PORTAL_HELPERS.setValue,
  },
};
