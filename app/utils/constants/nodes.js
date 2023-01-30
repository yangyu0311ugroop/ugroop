/**
 * Created by stephenkarpinskyj on 31/8/18.
 */

export const NODE_TIME_MODES = {
  /** Absolute date value without time */
  fixedDate: 'fixedDate',

  /** Absolute time value without date */
  fixedTime: 'fixedTime',

  /** Absolute date and time value */
  fixedDateTime: 'fixedDateTime',

  /** Duration, offset from parent value */
  relative: 'relative',

  /** Duration, offset from parent value but set to a particular time of day */
  relativeAtTime: 'relativeAtTime',

  /** Duration, offset from start */
  relativeStart: 'relativeStart',

  /** Duration, offset from nothing */
  unanchored: 'unanchored',

  /** Duration, offset from nothing but set to a particular time of day */
  unanchoredAtTime: 'unanchoredAtTime',
};

// region Positions
const POSITION_START = 'start';
const POSITION_MIDDLE = 'middle';
const POSITION_END = 'end';
const POSITION_ALL = [POSITION_START, POSITION_MIDDLE, POSITION_END];
const POSITION_START_END = [POSITION_START, POSITION_END];

/**
 * Position types of a node relative to another node.
 */
export const NODE_POSITIONS = {
  start: POSITION_START,
  middle: POSITION_MIDDLE,
  end: POSITION_END,

  all: POSITION_ALL,
  startEnd: POSITION_START_END,
  startMiddle: [POSITION_START, POSITION_MIDDLE],
};
// endregion

// region Day count types
const DAY_COUNT_TYPE_SINGLE_DAY = 'singleDay';
const DAY_COUNT_TYPE_MULTI_DAY = 'multiDay';
const DAY_COUNT_TYPE_ANY = 'any';

export const NODE_DAY_COUNT_TYPES = {
  singleDay: DAY_COUNT_TYPE_SINGLE_DAY,
  multiDay: DAY_COUNT_TYPE_MULTI_DAY,

  any: DAY_COUNT_TYPE_ANY,
};
// endregion

// region Has times
export const NODE_HAS_TIMES = {
  all: 'all',
  withTime: 'withTime',
  withoutTime: 'withoutTime',
};

// endregion

// region Statuses
export const INTERESTED_PERSON_STATUSES = {
  pending: '',
  complete: 'complete',
};

export const PARTICIPANT_STATUSES = {
  confirmed: 'confirmed',
  pending: '',
  declined: 'declined',
};

// I added this because, PARTICIPANT_STATUSES is uses by other components and to avoid conflicts
export const PARTICIPANT_STATUSES_REQUIRED = {
  confirmed_required: 'confirmed',
  pending_required: 'pending',
  declined_required: 'declined',
};

// endregion

export const NODE_CONSTANTS = {
  TIME_MODES: NODE_TIME_MODES,
  POSITIONS: NODE_POSITIONS,
  DAY_COUNT_TYPES: NODE_DAY_COUNT_TYPES,
  HAS_TIMES: NODE_HAS_TIMES,
};
