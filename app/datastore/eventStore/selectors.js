import _ from 'lodash';
import { EVENT_STORE } from 'appConstants';
import { ARRAY_HELPERS } from 'utils/helpers/arrays';
import { EVENT_STORE_CACHE_KEYS } from 'datastore/eventStore/cacheKey';
import { EVENT_STORE_UTILS } from 'datastore/eventStore/utils';
import { EVENT_PATHS } from './constants';

/** View */

const eventCreate = [EVENT_STORE, 'view', 'eventCreate'];
const eventView = [EVENT_STORE, 'view', 'eventView'];
const eventEdit = [EVENT_STORE, 'view', 'eventEdit'];
const eventForm = [EVENT_STORE, 'form', 'event'];
const eventFormProp = ({ path }) => [
  EVENT_STORE,
  'form',
  'event',
  ...ARRAY_HELPERS.arrayIfNot(path),
];

const flightBookingCreate = [EVENT_STORE, 'view', 'flightBookingCreate'];
const flightBookingView = [EVENT_STORE, 'view', 'flightBookingView'];
const flightBookingEdit = [EVENT_STORE, 'view', 'flightBookingEdit'];
const flightBookingFormProp = ({ path }) => [
  EVENT_STORE,
  'form',
  'flightBooking',
  ...ARRAY_HELPERS.arrayIfNot(path),
];

const coachCreate = [EVENT_STORE, 'view', 'coachCreate'];
const coachView = [EVENT_STORE, 'view', 'coachView'];
const coachViewProp = ({ path }) => [
  ...coachView,
  ...ARRAY_HELPERS.arrayIfNot(path),
];
const coachEdit = [EVENT_STORE, 'view', 'coachEdit'];
const coachFormProp = ({ path }) => [
  EVENT_STORE,
  'form',
  'coach',
  ...ARRAY_HELPERS.arrayIfNot(path),
];

const ratingView = [EVENT_STORE, 'view', 'ratings'];
const ratingViewProp = ({ path }) => [
  ...ratingView,
  ...ARRAY_HELPERS.arrayIfNot(path),
];

export const EVENT_STORE_VIEW_SELECTORS = {
  eventCreate,
  eventView,
  eventEdit,
  eventForm,
  eventFormProp,

  flightBookingCreate,
  flightBookingView,
  flightBookingEdit,
  flightBookingFormProp,

  coachCreate,
  coachView,
  coachViewProp,
  coachEdit,
  coachFormProp,

  ratingViewProp,
};

/** Data */

const events = [EVENT_STORE, 'events'];
const amountLastUpdated = [EVENT_STORE, 'lastUpdated'];
const event = ({ id }) => [EVENT_STORE, 'events', id];
const eventProp = ({ id, path }) => [
  EVENT_STORE,
  'events',
  id,
  ...ARRAY_HELPERS.arrayIfNot(path),
];

const cancellation = ({ id }) => [
  ...eventProp({ id, path: EVENT_PATHS.cancellation }),
];
const eventType = ({ id }) => [...eventProp({ id, path: EVENT_PATHS.type })];
const eventSubtype = ({ id }) => [
  ...eventProp({ id, path: EVENT_PATHS.subtype }),
];

// TODO: Remove need for this
const cachedEvent = {
  keyPath: ({ dataId: id }) => [EVENT_STORE, 'events', id],
  cacheKey: ({ dataId: id }) => `event.${id}.cachedEvent`,
  props: null,
  getter: ev => ev,
};

const hasAttendance = () => ({
  keyPath: ({ dataId: id }) => eventProp({ id, path: EVENT_PATHS.attendance }),
  props: null,
  getter: attendance =>
    !!attendance && Object.values(attendance).find(v => v === true),
});

const addSubtypes = ({ eventsProp = 'events' }) => ({
  keyPath: ({ [eventsProp]: eventsValue }) =>
    eventsValue.map(({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventSubtype({ id }),
    ),
  cacheKey: ({ [eventsProp]: eventsValue }) =>
    `event.${eventsProp}:${
      eventsValue ? eventsValue.map(({ dataId }) => dataId).toString() : 'null'
    }.addSubtypes`,
  props: ({ [eventsProp]: eventsValue }) => eventsValue,
  getter: (...subtypesValue) => {
    const eventsValue = subtypesValue.pop();
    return eventsValue.reduce(
      (acc, eventValue, idx) => [
        ...acc,
        _.assign(eventValue, { subtype: subtypesValue[idx] }),
      ],
      [],
    );
  },
});

const filterEventsByFlightBookingDataId = ({
  eventStartTimesProp = 'eventStartTimes',
  eventFlightBookingDataIdsProp = 'eventDataIds',
  flightBookingDataIdProp = 'dataId',
  allFlightsProp = 'allFlights',
}) => ({
  keyPath: ({ [eventFlightBookingDataIdsProp]: dataIds }) =>
    !!dataIds &&
    dataIds.map(id => eventProp({ id, path: EVENT_PATHS.flightBooking })),
  cacheKey: EVENT_STORE_CACHE_KEYS.filterEventsByFlightBookingDataId({
    eventStartTimesProp,
    eventFlightBookingDataIdsProp,
    flightBookingDataIdProp,
    allFlightsProp,
  }),
  props: [
    ({ [eventStartTimesProp]: eventStartTimes }) => eventStartTimes,
    ({ [flightBookingDataIdProp]: id }) => id,
    ({ [allFlightsProp]: allFlights }) => allFlights,
  ],
  getter: (...args) => {
    const eventFlightBookingDataIds = _.dropRight(args, 3);
    const [eventStartTimes, dataId, allFlights] = _.takeRight(args, 3);
    const reduced = _.zip(eventStartTimes, eventFlightBookingDataIds).reduce(
      EVENT_STORE_UTILS.filterEventsByFlightBookingDataIdReducer(
        dataId,
        allFlights,
      ),
      [],
    );
    return _.sortBy(reduced, ({ value }) => value).map(({ id }) => id);
  },
});

const flightBookings = [EVENT_STORE, 'flightBookings'];
const flightBookingIds = [EVENT_STORE, 'flightBookingIds'];
const flightBookingProp = ({ id, path }) => [
  ...flightBookings,
  id,
  ...ARRAY_HELPERS.arrayIfNot(path),
];
const flightBooking = ({ id }) => [...flightBookings, id];
const flightBookingTemplateId = ({ id }) => [
  ...flightBookings,
  id,
  'templateId',
];

/**
 * Input props:
 *  [idsProp] (set of flightBooking ids)
 *  [templateIdProp] (template node id, include if matches)
 */
const filterFlightBookingsByTemplateId = ({
  idsProp = 'ids',
  templateIdProp = 'templateId',
}) => ({
  keyPath: ({ [idsProp]: ids }) =>
    !!ids && ids.map(id => flightBookingTemplateId({ id })),
  cacheKey: EVENT_STORE_CACHE_KEYS.filterFlightBookingsByTemplateId({
    idsProp,
    templateIdProp,
  }),
  props: [
    ({ [idsProp]: ids }) => ids,
    ({ [templateIdProp]: templateId }) => templateId,
  ],
  getter: (...args) => {
    const templateIds = _.dropRight(args, 2);
    const [ids, templateId] = _.takeRight(args, 2);
    return _.zip(ids, templateIds).reduce(
      EVENT_STORE_UTILS.filterFlightBookingByTemplateIdReducer(templateId),
      [],
    );
  },
});

const eventAttachments = [EVENT_STORE, 'attachments'];
const eventAttachment = ({ id }) => [EVENT_STORE, 'attachments', id];

const activityDetail = [EVENT_STORE, 'activityDetails'];
const activityDetailProp = ({ id, path }) => [
  ...activityDetail,
  id,
  ...ARRAY_HELPERS.arrayIfNot(path),
];

const eventAttachmentProp = ({ id, path }) => [
  ...eventAttachments,
  id,
  ...ARRAY_HELPERS.arrayIfNot(path),
];

export const EVENT_STORE_DATA_SELECTORS = {
  events,
  amountLastUpdated,
  event,
  eventProp,
  cancellation,
  eventType,
  eventSubtype,
  cachedEvent,
  hasAttendance,
  addSubtypes,
  filterEventsByFlightBookingDataId,

  flightBookings,
  flightBookingIds,
  flightBookingProp,
  flightBooking,
  flightBookingTemplateId,
  filterFlightBookingsByTemplateId,

  activityDetail,
  activityDetailProp,

  eventAttachments,
  eventAttachment,
  eventAttachmentProp,
};

const attachments = ({ id }) => [EVENT_STORE, 'events', id, 'eventAttachments'];

export const EVENT_STORE_SELECTORS = {
  attachments,
};
