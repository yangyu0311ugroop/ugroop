/**
 * Created by stephenkarpinskyj on 27/8/18.
 */

// TODO: Better clarify what should be here vs 'utils/helpers/events'

import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { ability } from 'apis/components/Ability/ability';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import dotProp from 'dot-prop-immutable';
import { TRANSPORTATION_END_LOC_INPUTS } from 'smartComponents/Event/components/Event/parts/Transportation/End/inputs';
import { TRANSPORTATION_START_LOC_INPUTS } from 'smartComponents/Event/components/Event/parts/Transportation/Start/inputs';
import timestring from 'timestring';
import {
  EVENT,
  EVENT_ACCOMMODATION,
  EVENT_ACTIVITY,
  EVENT_BUS,
  EVENT_COACH,
  EVENT_FLIGHT,
  EVENT_VEHICLE_HIRE,
  EVENT_SHIP,
  EVENT_BOAT,
  EVENT_FERRY,
  EVENT_TRAM,
  EVENT_TRAIN,
  EVENT_CAB,
  EVENT_CAR,
  EVENT_TAXI,
  EVENT_RIDESHARE,
  EVENT_BICYCLE,
  PARTICIPANT,
} from 'utils/modelConstants';
import {
  EVENT_CONSTANTS,
  DEFAULT_ROOM_CONFIGURATION,
  EVENTS,
} from 'utils/constants/events';
import { EMPTY_RTE } from 'appConstants';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { NODE_CONSTANTS } from 'utils/constants/nodes';
import { NODE_HELPERS } from 'utils/helpers/nodes';
import { DEFAULT_DURATION } from 'utils/constants/dateTime';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import startTimeInputs from 'smartComponents/Event/components/Event/parts/Event/StartTime/inputs';
import endTimeInputs from 'smartComponents/Event/components/Event/parts/Event/EndTime/inputs';
import startAirportInputs from 'smartComponents/Event/components/Event/parts/Flight/StartAirport/inputs';
import endAirportInputs from 'smartComponents/Event/components/Event/parts/Flight/EndAirport/inputs';
import { INPUT_UTILS } from 'ugcomponents/Inputs';
import { isEmptyString } from 'utils/stringAdditions';

/** Types */

const dataTypeToNodeType = (type, subtype) => {
  switch (type) {
    case EVENT_CONSTANTS.EVENTS.ACTIVITY.type:
      return EVENT_ACTIVITY;

    case EVENT_CONSTANTS.EVENTS.ACCOMMODATION.type:
      return EVENT_ACCOMMODATION;

    case EVENT_CONSTANTS.EVENTS.TRANSPORTATION.type: {
      switch (subtype) {
        case EVENT_CONSTANTS.TRANSPORTATIONS.FLIGHT.type:
          return EVENT_FLIGHT;
        case EVENT_CONSTANTS.TRANSPORTATIONS.COACH.type:
          return EVENT_COACH;
        case EVENT_CONSTANTS.TRANSPORTATIONS.BUS.type:
          return EVENT_BUS;
        case EVENT_CONSTANTS.TRANSPORTATIONS.VEHICLE_HIRE.type:
          return EVENT_VEHICLE_HIRE;
        case EVENT_CONSTANTS.TRANSPORTATIONS.SHIP.type:
          return EVENT_SHIP;
        case EVENT_CONSTANTS.TRANSPORTATIONS.BOAT.type:
          return EVENT_BOAT;
        case EVENT_CONSTANTS.TRANSPORTATIONS.FERRY.type:
          return EVENT_FERRY;
        case EVENT_CONSTANTS.TRANSPORTATIONS.TRAIN.type:
          return EVENT_TRAIN;
        case EVENT_CONSTANTS.TRANSPORTATIONS.TRAM.type:
          return EVENT_TRAM;
        case EVENT_CONSTANTS.TRANSPORTATIONS.CAR.type:
          return EVENT_CAR;
        case EVENT_CONSTANTS.TRANSPORTATIONS.CAB.type:
          return EVENT_CAB;
        case EVENT_CONSTANTS.TRANSPORTATIONS.TAXI.type:
          return EVENT_TAXI;
        case EVENT_CONSTANTS.TRANSPORTATIONS.RIDESHARE.type:
          return EVENT_RIDESHARE;
        case EVENT_CONSTANTS.TRANSPORTATIONS.BICYCLE.type:
          return EVENT_BICYCLE;

        default:
          return EVENT;
      }
    }

    default:
      return EVENT;
  }
};

/** Rooms */

const stringDataToInput = data => data;
const numberDataToInput = data => (data ? data.toString() : '');

const roomDataToInput = data => {
  const { id, name, bedCount, guestCount, quantity } = data;
  return {
    id,
    name: stringDataToInput(name),
    bedCount: numberDataToInput(bedCount),
    guestCount: numberDataToInput(guestCount),
    quantity: numberDataToInput(quantity),
  };
};

export const makeDefaultRoomConfiguration = () =>
  DEFAULT_ROOM_CONFIGURATION.map((roomData, index) =>
    roomDataToInput({
      id: `${Date.now().toString()}${index + 1}`,
      ...roomData,
    }),
  );

/** Input model processing */

const isDayInputDayId = dayInput =>
  dayInput === Number.parseInt(dayInput, 10).toString();

const getParentNodeIdPath = () =>
  NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.parentNodeId);

const getParentNodeId = model => dotProp.get(model, getParentNodeIdPath());

const getChangedParentNodeId = model => {
  const prev = getParentNodeId(model);
  const next = getParentNodeId(processParentNodeId(model));

  return prev !== next ? next : null;
};

const parseTimeInput = (model, inputs) => {
  const mode = dotProp.get(model, inputs.mode.name, undefined);
  if (mode !== undefined) {
    const day = dotProp.get(model, inputs.tempDay.name, undefined);
    const time = dotProp.get(model, inputs.tempTime.name, undefined);
    return { mode, day, time };
  }
  return null;
};

export const calculateDateTimeMode = (dayInput, timeInput) => {
  if (timeInput) return NODE_CONSTANTS.TIME_MODES.fixedDateTime;
  return NODE_CONSTANTS.TIME_MODES.fixedDate;
};

export const calculateDateTimeValue = (mode, date, time) => {
  switch (mode) {
    case NODE_CONSTANTS.TIME_MODES.fixedDate:
      return date.toISOString();
    case NODE_CONSTANTS.TIME_MODES.fixedDateTime:
      return MOMENT_HELPERS.setTime(date, time).toISOString();
    default:
      return null;
  }
};

const calculateDateTimeOutput = input => {
  const mode = calculateDateTimeMode(input.day, input.time);
  const date = MOMENT_HELPERS.createUtc(input.day);
  const time = INPUT_UTILS.parseTime(input.time);
  const value = calculateDateTimeValue(mode, date, time);
  return { mode, value, timeZoneId: input.timeZoneId };
};

export const calculateDayIdTimeMode = (modeInput, timeInput) => {
  if (timeInput) {
    if (modeInput === NODE_CONSTANTS.TIME_MODES.unanchored) {
      return NODE_CONSTANTS.TIME_MODES.unanchoredAtTime;
    }
    return NODE_CONSTANTS.TIME_MODES.relativeAtTime;
  }
  return modeInput;
};

const calculateDayIdTimeOutput = input => {
  const mode = calculateDayIdTimeMode(input.mode, input.time);
  const value = MOMENT_HELPERS.createDuration(DEFAULT_DURATION)
    .add(input.time)
    .toISOString();
  return { mode, value, timeZoneId: input.timeZoneId };
};

const calculateDurationTimeMode = (modeInput, timeInput) => {
  if (modeInput === NODE_CONSTANTS.TIME_MODES.relativeStart) return modeInput;
  if (timeInput) return NODE_CONSTANTS.TIME_MODES.relativeAtTime;
  return NODE_CONSTANTS.TIME_MODES.relative;
};

export const calculateDurationTimeValue = (mode, dayInput, timeInput) => {
  let value;
  switch (mode) {
    case NODE_CONSTANTS.TIME_MODES.relative:
    case NODE_CONSTANTS.TIME_MODES.relativeAtTime:
    case NODE_CONSTANTS.TIME_MODES.unanchored:
    case NODE_CONSTANTS.TIME_MODES.unanchoredAtTime:
      value = MOMENT_HELPERS.createDuration(dayInput);
      if (value.as('s') < 0)
        value = MOMENT_HELPERS.createDuration(DEFAULT_DURATION);
      break;

    case NODE_CONSTANTS.TIME_MODES.relativeStart:
      value = MOMENT_HELPERS.createDuration(timestring(dayInput), 's');
      break;

    default:
      return null;
  }
  return value.add(timeInput).toISOString();
};

const calculateDurationTimeOutput = input => {
  const mode = calculateDurationTimeMode(input.mode, input.time);
  const value = calculateDurationTimeValue(mode, input.day, input.time);
  return { mode, value, timeZoneId: input.timeZoneId };
};

export const calculateTimeOutput = input => {
  switch (input.mode) {
    case NODE_CONSTANTS.TIME_MODES.relative:
    case NODE_CONSTANTS.TIME_MODES.relativeAtTime:
    case NODE_CONSTANTS.TIME_MODES.unanchored:
    case NODE_CONSTANTS.TIME_MODES.unanchoredAtTime: {
      if (isDayInputDayId(input.day)) {
        return calculateDayIdTimeOutput(input);
      }
      return calculateDurationTimeOutput(input);
    }

    case NODE_CONSTANTS.TIME_MODES.relativeStart:
      return calculateDurationTimeOutput(input);

    default:
      return calculateDateTimeOutput(input);
  }
};

const calculateParentNodeIdOutput = model => {
  // Parse input
  const startModeInput = dotProp.get(model, startTimeInputs.mode.name, null);
  const startDayInput = dotProp.get(model, startTimeInputs.tempDay.name, null);

  // Calculate output
  const isRelative = NODE_HELPERS.isRelative(startModeInput);
  const isDayId = isDayInputDayId(startDayInput);
  return isRelative && isDayId ? Number.parseInt(startDayInput, 10) : null;
};

const participantCannotExecuteEvent = value =>
  (isEmptyString(value) || !value || value === EMPTY_RTE || !value.length) &&
  !ability.can('execute', PARTICIPANT);

export const processTimeModel = (model, inputs) => {
  let m = model;
  const input = parseTimeInput(model, inputs);
  if (input) {
    const output = calculateTimeOutput(input);
    m = dotProp.delete(m, inputs.tempDay.name);
    m = dotProp.delete(m, inputs.tempTime.name);
    m = dotProp.delete(m, inputs.tempMode.name);
    m = dotProp.set(m, inputs.mode.name, output.mode);
    m = dotProp.set(m, inputs.value.name, output.value);
  }
  return m;
};

export const processAirportModel = (model, inputs) => {
  let m = model;

  const name = dotProp.get(m, inputs.airport.name);
  const iataCode = dotProp.get(m, inputs.airport.iataCodeProps.name);

  // Airport without iataCode
  if (!!name && !iataCode) {
    m = dotProp.set(m, inputs.airport.name, '');
    m = dotProp.set(m, inputs.airport.iataCodeProps.name, '');
    m = dotProp.set(m, inputs.airport.cityNameProps.name, '');
    m = dotProp.set(m, inputs.airport.timeZoneIdProps.name, '');
  }

  return m;
};

export const processParentNodeId = model => {
  const parentNodeId = calculateParentNodeIdOutput(model);

  let m = model;
  if (parentNodeId) {
    m = dotProp.set(m, getParentNodeIdPath(), parentNodeId);
  }
  return m;
};

export const removeParentNodeId = model => {
  let m = model;
  m = dotProp.delete(m, getParentNodeIdPath());
  return m;
};

export const processCoachModel = model => {
  let m = model;

  const sameAsOrigin = dotProp.get(m, 'sameAsOrigin');

  if (sameAsOrigin) {
    const startLoc = dotProp.get(m, TRANSPORTATION_START_LOC_INPUTS.name);
    const startPlaceId = dotProp.get(
      m,
      TRANSPORTATION_START_LOC_INPUTS.placeId,
    );
    const startIcon = dotProp.get(m, TRANSPORTATION_START_LOC_INPUTS.icon);
    const startTimeZoneId = dotProp.get(
      m,
      TRANSPORTATION_START_LOC_INPUTS.timeZoneId,
    );

    m = dotProp.set(m, TRANSPORTATION_END_LOC_INPUTS.end, {});
    m = dotProp.set(m, TRANSPORTATION_END_LOC_INPUTS.name, startLoc);
    m = dotProp.set(m, TRANSPORTATION_END_LOC_INPUTS.placeId, startPlaceId);
    m = dotProp.set(m, TRANSPORTATION_END_LOC_INPUTS.icon, startIcon);
    m = dotProp.set(
      m,
      TRANSPORTATION_END_LOC_INPUTS.timeZoneId,
      startTimeZoneId,
    );
  }

  return m;
};

export const processToKeyValue = (key, value) => {
  let tempValue = value;
  if (typeof value === 'object') {
    tempValue = JSON.stringify(value);
  }
  return {
    Key: key,
    Value: tempValue,
  };
};

export const processBicycleActivity = model => {
  let m = model;
  const detailsPath = EVENT_STORE_HELPERS.pathToEventInputName(
    EVENT_PATHS.activityDetails,
  );
  const details = dotProp.get(m, detailsPath);

  if (!details) return m;

  const processedDetails = Object.keys(details).map(key =>
    processToKeyValue(key, details[key]),
  );

  m = dotProp.set(m, detailsPath, processedDetails);
  return m;
};

export const processChangeInTransportationSubType = model => {
  let m = model;

  const typePath = EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.type);
  const type = dotProp.get(m, typePath, null);
  if (type !== EVENTS.TRANSPORTATION.type) return m;

  const subtypePath = EVENT_STORE_HELPERS.pathToEventInputName(
    EVENT_PATHS.subtype,
  );
  const nodeTypePath = NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.type);

  const eventSubtypeRaw = dotProp.get(m, subtypePath, '');
  if (isEmptyString(eventSubtypeRaw)) return m;

  const eventSubtype = `event${eventSubtypeRaw.toLowerCase()}`;
  m = dotProp.set(m, nodeTypePath, eventSubtype);

  return m;
};

export const processCreateModel = model => {
  let m = model;
  m = processParentNodeId(m);
  m = processTimeModel(m, startTimeInputs);
  m = processTimeModel(m, endTimeInputs);
  m = processAirportModel(m, startAirportInputs);
  m = processAirportModel(m, endAirportInputs);
  m = processCoachModel(m);
  m = processBicycleActivity(m);

  return m;
};

export const processPatchModel = (model, process) => {
  let m = model;
  m = removeParentNodeId(m);

  if (process) {
    m = processTimeModel(m, startTimeInputs);
    m = processTimeModel(m, endTimeInputs);
  }
  m = processAirportModel(m, startAirportInputs);
  m = processAirportModel(m, endAirportInputs);
  m = processCoachModel(m);
  m = processChangeInTransportationSubType(m);
  m = processBicycleActivity(m);
  return m;
};

export const getSublabelType = (type, position) => {
  if (type === EVENT_CONSTANTS.EVENTS.ACCOMMODATION.type) {
    if (position === NODE_CONSTANTS.POSITIONS.start) {
      return EVENT_CONSTANTS.SUBLABEL_TYPES.duration;
    }
  }
  return EVENT_CONSTANTS.SUBLABEL_TYPES.time;
};

export const EVENT_UTILS = {
  dataTypeToNodeType,
  makeDefaultRoomConfiguration,
  getChangedParentNodeId,
  processCreateModel,
  processPatchModel,
  getSublabelType,
  participantCannotExecuteEvent,
};
