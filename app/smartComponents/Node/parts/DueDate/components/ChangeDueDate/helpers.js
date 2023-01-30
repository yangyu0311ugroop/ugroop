import { DEFAULT, HUMANIZE_DURATION_CONSTANT } from 'appConstants';
import momentjs from 'moment/moment';
import React, { Fragment } from 'react';
import { FORMATS_DATE_TIME } from 'utils/constants/dateTime';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import moment from 'utils/helpers/moment';
import { DAY, TEMPLATE, ACTIVITY, CHECKGROUP } from 'utils/modelConstants';
import humanizeDuration from 'humanize-duration';

// temporary treat activity as event for testing
const EVENT = ACTIVITY;

export const RELATIVE = 'relative';
export const FIXED = 'fixedDateTime';
export const FIXED_NO_TIME = 'fixedDate';
export const UNSET = 'unset';
export const CUSTOM = 'custom';
export const DEFAULT_DURATION = 'P0D';
export const DEFAULT_DURATION_TIME = 'PT0S';

export const DUE_DATE_RELATIVE_OPTIONS = {
  [TEMPLATE]: ['-P1D', '-P2D', '-P7D', '-P14D', '-P1M', '-P2M'],
  [DAY]: ['-P1D', '-P2D', '-P7D'],
  [EVENT]: ['-PT5M', '-PT15M', '-PT30M', '-PT1H'],
  [CHECKGROUP]: [],
  [DEFAULT]: [],
};

const isUnset = mode => mode === UNSET;
const isCustom = mode => mode === CUSTOM;
const isFixed = mode => mode === FIXED || mode === FIXED_NO_TIME;
const isFixedWithTime = mode => mode === FIXED;
const isFixedNoTime = mode => mode === FIXED_NO_TIME;
const isRelative = mode => mode === RELATIVE;
const isDefault = value => value === DEFAULT_DURATION;
const isDefaultTime = value => value === DEFAULT_DURATION_TIME;
const inADay = dayCount => dayCount < 1 && dayCount > 0;
const aDayAgo = dayCount => dayCount > -1 && dayCount < 0;
const withinADay = dayCount => dayCount < 1 && dayCount > -1;
const isOneDayMinimum = parentType =>
  !parentType || parentType === TEMPLATE || parentType === DAY;

const makeRelativeOption = (key, value) => {
  if (!key) {
    return null;
  }

  if (value) {
    return { mode: RELATIVE, key, value };
  }

  return DUE_DATE_HELPERS.makeCustomDurationOption(key);
};

const makeRelativeOptions = keys =>
  Array.isArray(keys)
    ? keys.map(key => DUE_DATE_HELPERS.makeRelativeOption(key))
    : [];

const renderNoOffset = parentType => {
  switch (parentType) {
    case TEMPLATE:
      return 'start of tour';
    case DAY:
      return 'on this day';
    case EVENT:
      return 'on date of event';
    default:
      return 'start of tour, day or event';
  }
};

const modeEventOptions = () => [
  DUE_DATE_HELPERS.makeRelativeOption(
    'PT0S',
    <Fragment>at time of event</Fragment>,
  ),
  ...DUE_DATE_HELPERS.makeRelativeOptions(DUE_DATE_RELATIVE_OPTIONS[EVENT]),
];

const makeOptionsByType = parentType => {
  switch (parentType) {
    case TEMPLATE:
    case DAY:
      return DUE_DATE_HELPERS.makeRelativeOptions(
        DUE_DATE_RELATIVE_OPTIONS[parentType],
      );
    case EVENT:
      return DUE_DATE_HELPERS.modeEventOptions();
    default:
      return DUE_DATE_HELPERS.makeRelativeOptions(
        DUE_DATE_RELATIVE_OPTIONS[DEFAULT],
      );
  }
};

const makeCustomDurationOption = (
  value,
  parentType,
  useActual = false,
  prefix,
) => {
  if (!value) {
    return null;
  }

  const humaniseDuration = DUE_DATE_HELPERS.humaniseDuration({
    value,
    parentType,
    useActual,
  });

  return {
    mode: RELATIVE,
    key: value,
    value: LOGIC_HELPERS.ifElse(
      prefix,
      <span>
        Click to set {'"'}
        {humaniseDuration}
        {'"'}
      </span>,
      humaniseDuration,
    ),
  };
};

const makeSelectedFixedDateOption = dueDate => {
  if (!dueDate) {
    return null;
  }
  const { mode, value } = dueDate;

  if (!DUE_DATE_HELPERS.isFixed(mode)) {
    return null;
  }

  const key = momentjs(value).toISOString();

  if (DUE_DATE_HELPERS.isFixedWithTime(mode)) {
    return {
      mode,
      key,
      value: (
        <Fragment>
          {moment.renderDayDate(value)} at {moment.renderTime(value)}
        </Fragment>
      ),
    };
  }

  return {
    mode,
    key,
    value: <Fragment>{moment.renderDayDate(value)}</Fragment>,
  };
};

const makeSelectedRelativeDateOption = (
  dueDate,
  parentType,
  useActual = false,
) => {
  if (!dueDate) {
    return null;
  }

  const { mode, value } = dueDate;

  if (
    DUE_DATE_HELPERS.isDefault(value) ||
    DUE_DATE_HELPERS.isDefaultTime(value)
  ) {
    return null;
  }

  if (!DUE_DATE_HELPERS.isRelative(mode)) {
    return null;
  }

  return DUE_DATE_HELPERS.makeCustomDurationOption(
    dueDate.value,
    parentType,
    useActual,
  );
};

const makeSelectedFixedDateOptionState = state => {
  const { fixedDate, fixedTime } = state;

  if (!fixedDate) {
    return null;
  }
  const dateTime = moment.setTime(
    momentjs(fixedDate),
    momentjs(fixedTime, FORMATS_DATE_TIME.TIME),
  );
  const mode = LOGIC_HELPERS.ifElse(fixedTime, FIXED, FIXED_NO_TIME);

  return {
    mode,
    key: `${dateTime.toISOString()}`,
    value: (
      <Fragment>
        Click to set {`"`}
        {moment.renderDayDate(dateTime)}
        {LOGIC_HELPERS.ifElse(fixedTime, ` at ${moment.renderTime(dateTime)}`)}
        {`"`}
      </Fragment>
    ),
  };
};

const makeNoOffsetOption = parentType => ({
  mode: RELATIVE,
  key: DEFAULT_DURATION,
  value: <Fragment>{DUE_DATE_HELPERS.renderNoOffset(parentType)}</Fragment>,
});

const makeHeadingOption = value => ({
  key: value,
  value,
  heading: true,
  disabled: true,
});

const renderOffset = ({ value, parentType, translateType, useActual }) => {
  const duration = momentjs.duration(value);
  const durationInMilliSec = duration.asMilliseconds();

  const offsetDirection = LOGIC_HELPERS.ifElse(
    value && value.indexOf('-') === -1,
    'after',
    'before',
  );
  const postfix = LOGIC_HELPERS.ifElse(
    [translateType, parentType !== CHECKGROUP],
    ` this ${translateType || ''}`,
    '',
  );
  let renderDuration;
  let durationSet = duration.humanize();

  if (useActual) {
    durationSet = humanizeDuration(
      durationInMilliSec,
      HUMANIZE_DURATION_CONSTANT,
    );
  }

  switch (parentType) {
    case TEMPLATE:
    case DAY:
      renderDuration = LOGIC_HELPERS.ifElse(
        DUE_DATE_HELPERS.withinADay(duration.asDays()),
        'a day',
        durationSet,
      );
      break;
    default:
      renderDuration = durationSet;
      break;
  }

  return `${renderDuration} ${offsetDirection}${postfix}`;
};

const humaniseDuration = ({ value, parentType, ...props }) => {
  if (!value) {
    return null;
  }

  if (DUE_DATE_HELPERS.isDefault(value)) {
    return DUE_DATE_HELPERS.renderNoOffset(parentType);
  }
  if (DUE_DATE_HELPERS.isDefaultTime(value)) {
    return 'at time of event';
  }

  return DUE_DATE_HELPERS.renderOffset({ value, parentType, ...props });
};

const calculateDate = ({ startTime, dueDate, parentType, anchorDate }) => {
  if (startTime) return startTime;

  if (!dueDate) {
    return null;
  }
  const { mode, value } = dueDate;

  if (DUE_DATE_HELPERS.isFixed(mode)) {
    return momentjs(value);
  }

  if (!DUE_DATE_HELPERS.isRelative(mode)) {
    return null;
  }

  const duration = momentjs.duration(value);

  if (!anchorDate) {
    return null;
  }

  const dayCount = duration.asDays();

  if (!DUE_DATE_HELPERS.isOneDayMinimum(parentType)) {
    return momentjs(anchorDate).add(duration);
  }
  if (DUE_DATE_HELPERS.inADay(dayCount)) {
    return momentjs(anchorDate).add(1, 'day');
  }
  if (DUE_DATE_HELPERS.aDayAgo(dayCount)) {
    return momentjs(anchorDate).add(-1, 'day');
  }

  return momentjs(anchorDate).add(duration);
};

const renderCalculatedDate = ({ value, parentType, calculatedDate }) => {
  const duration = momentjs.duration(value);
  const dayCount = duration.asDays();

  if (
    !DUE_DATE_HELPERS.isDefault(value) &&
    !DUE_DATE_HELPERS.isOneDayMinimum(parentType) &&
    DUE_DATE_HELPERS.withinADay(dayCount)
  ) {
    return moment.renderTime(calculatedDate);
  }

  return moment.renderCalendarDueDate(calculatedDate);
};

export const DUE_DATE_HELPERS = {
  isUnset,
  isCustom,
  isFixed,
  isFixedWithTime,
  isFixedNoTime,
  isRelative,
  isDefault,
  isDefaultTime,
  inADay,
  aDayAgo,
  withinADay,
  isOneDayMinimum,
  modeEventOptions,
  makeRelativeOption,
  makeRelativeOptions,
  makeSelectedFixedDateOption,
  makeSelectedFixedDateOptionState,
  makeOptionsByType,
  makeNoOffsetOption,
  makeHeadingOption,
  renderOffset,
  renderNoOffset,
  makeCustomDurationOption,
  makeSelectedRelativeDateOption,
  humaniseDuration,
  calculateDate,
  renderCalculatedDate,
};
