import get from 'lodash/get';
import moment from 'moment';
import {
  EVENT_CONSTANTS,
  DEFAULT_ICON_TYPE,
  DEFAULT_ICON_NAME,
  DEFAULT_ICON,
  UNKNOWN_EVENT_SUBTYPE,
  UNKNOWN_EVENT_TYPE,
} from 'utils/constants/events';
import { NODE_CONSTANTS } from 'utils/constants/nodes';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { NODE_HELPERS } from 'utils/helpers/nodes';
import { EVENT } from 'utils/modelConstants';
import { ability } from 'apis/components/Ability/ability';

export const canCreateEvent = () => ability.can('create', EVENT);

export const getEventTypeConstants = type =>
  Object.values(EVENT_CONSTANTS.EVENTS).find(consts => consts.type === type) ||
  UNKNOWN_EVENT_TYPE;

export const getEventSubtypeConstants = (type, subtype) =>
  Object.values(getEventTypeConstants(type).getTypes()).find(
    consts => consts.type === subtype,
  ) || UNKNOWN_EVENT_SUBTYPE;

export const getFirstEventSubtypeConstants = type => {
  const arr = Object.values(getEventTypeConstants(type).getTypes());
  return arr.length ? arr[0] : UNKNOWN_EVENT_SUBTYPE;
};

export const getEventIcons = (type, subtype) => {
  const { iconOverrides = [] } = getEventSubtypeConstants(type, subtype);
  return [
    { type: DEFAULT_ICON_TYPE, name: DEFAULT_ICON_NAME, icon: DEFAULT_ICON },
    ...iconOverrides,
  ];
};

export const getEventIcon = ({
  icon,
  iconEnd,
  iconOverrides,
  position,
  iconOverride,
}) => {
  if (iconOverrides) {
    const found = iconOverrides.find(i => i.type === iconOverride);
    if (found) {
      return found.icon;
    }
  }

  switch (position) {
    case NODE_CONSTANTS.POSITIONS.end:
      return iconEnd || icon;
    default:
      return icon;
  }
};

export const getEventSubtypeClassName = (type, subtype) => `${type}.${subtype}`;

export const getEventSubtypeHoverClassName = (type, subtype) => {
  const className = getEventSubtypeClassName(type, subtype);
  return `${className}.hover`;
};

export const getEventSubtypeClassBorderColorName = (type, subtype) => {
  const className = getEventSubtypeClassName(type, subtype);
  return `${className}.borderColor`;
};

export const getEventSubtypeClassSolidColorName = (type, subtype) => {
  const className = getEventSubtypeClassName(type, subtype);
  return `${className}.solidColor`;
};

// To be revisited as we will now be allowing non-flight transportation subtypes to be modified
export const isFlightTransportationEvent = subtype =>
  EVENT_CONSTANTS.TRANSPORTATIONS.FLIGHT.type === subtype;

export const eventsByTimeZoneIdReducer = (acc, event, index, events) => {
  const tzOffset = MOMENT_HELPERS.renderZoneOffset(event.value);
  const prevTzOffset =
    index && MOMENT_HELPERS.renderZoneOffset(events[index - 1].value);

  if (tzOffset !== prevTzOffset) {
    acc.push([event]);
  } else {
    acc[acc.length - 1].push(event);
  }

  return acc;
};

export const isEventCustomDate = type =>
  [
    EVENT_CONSTANTS.ACTIVITIES.RISE_AND_SHINE.type,
    EVENT_CONSTANTS.ACTIVITIES.REST_AND_SLEEP.type,
  ].includes(type);

export const normaliseFlight = (data, flightBookingId) => {
  const {
    from = {},
    to = {},
    departDayId,
    departDayIndex,
    departTime,
    arriveDayIndex,
    arriveTime,
    travelClass,
    airline,
    flightNumber,
    terminal,
    gate,
    description,
    uploadedIds = [],
    uploadedFiles = {},
  } = data;

  return {
    data: {
      eventAttachments: uploadedIds.map(uploadedId => {
        const { name, url: link, size, responseFile } = uploadedFiles[
          uploadedId
        ];
        const type = get(responseFile, 'type');

        return { name, link, size, type };
      }),
      description,
      detail: {
        detail: {
          flightBookingId, // to add to a flight booking
          end: {
            airport: {
              cityName: to.cityName,
              iataCode: to.iataCode,
              name: to.airportName,
            },
          },
          start: {
            airport: {
              cityName: from.cityName,
              iataCode: from.iataCode,
              name: from.airportName,
            },
          },
          airline,
          flightNumber,
          gate,
          terminal,
          travelClass,
          iconOverride: undefined,
        },
        type: 'Flight',
      },
      type: 'Transportation',
    },
    node: {
      customData: {
        end: {
          mode: arriveTime ? 'relativeAtTime' : 'relative',
          tempDay: `P${arriveDayIndex - departDayIndex}D`,
          tempTime: arriveTime,
          timeZoneId: to.timeZoneId,
        },
        start: {
          mode: departTime ? 'relativeAtTime' : 'relative',
          tempDay: `${departDayId}`,
          tempTime: departTime,
          timeZoneId: from.timeZoneId,
        },
      },
      parentNodeId: 30892, // timeLineId
    },
  };
};

export const normaliseFlightBooking = (data = {}) => {
  const { itinerary, number, passengerCount, bookingBy } = data;

  return {
    bookingNumber: number,
    name: itinerary,
    passengerCount,
    supplier: bookingBy,
  };
};

const convertAttachments = (data = {}) => {
  if (!data.eventAttachments || Array.isArray(data.eventAttachments))
    return data;

  const parsedData = data;

  // convert object to array
  parsedData.eventAttachments = Object.keys(data.eventAttachments).map(
    key => data.eventAttachments[key],
  );

  return parsedData;
};

const validateTime = (data = {}, canBeSameDay) => {
  const [departMoment, arriveMoment] = EVENT_HELPERS.genMoments(data);

  if (!departMoment || !arriveMoment) return null;

  return NODE_HELPERS.calculateDuration(
    departMoment,
    arriveMoment.add(LOGIC_HELPERS.ifElse(canBeSameDay, 0, 1), 'day'),
  );
};

const isSameDay = (data = {}) => {
  const [departMoment, arriveMoment] = EVENT_HELPERS.genMoments(data);

  if (!departMoment || !arriveMoment) return null;

  return departMoment.date() === arriveMoment.date();
};

const canBeSameDay = (data = {}) => {
  const [departMoment, arriveMoment] = EVENT_HELPERS.genMoments(data);

  if (!departMoment || !arriveMoment) return true;

  return arriveMoment.isSameOrAfter(departMoment);
};

const genMoments = (data = {}) => {
  const { arriveTime, departTime } = data;

  if (!arriveTime || !departTime) return [];

  let departTimeZone = get(data, 'from.data.timezone');
  let arriveTimeZone = get(data, 'to.data.timezone');

  if (!departTimeZone || !arriveTimeZone) return [];

  departTimeZone = Number.parseFloat(departTimeZone);
  arriveTimeZone = Number.parseFloat(arriveTimeZone);

  const departMoment = moment(departTime, 'HH:mm').utcOffset(
    departTimeZone,
    true,
  );
  const arriveMoment = moment(arriveTime, 'HH:mm').utcOffset(
    arriveTimeZone,
    true,
  );

  return [departMoment, arriveMoment];
};

export const EVENT_HELPERS = {
  genMoments,
  isSameDay,
  canBeSameDay,
  validateTime,
  normaliseFlight,
  normaliseFlightBooking,
  convertAttachments,

  canCreateEvent,

  isFlightTransportationEvent,

  getEventTypeConstants,
  getEventSubtypeConstants,
  getFirstEventSubtypeConstants,
  getEventIcons,
  getEventIcon,
  getEventSubtypeClassName,
  getEventSubtypeHoverClassName,
  getEventSubtypeClassBorderColorName,
  getEventSubtypeClassSolidColorName,

  eventsByTimeZoneIdReducer,
  isEventCustomDate,
};
