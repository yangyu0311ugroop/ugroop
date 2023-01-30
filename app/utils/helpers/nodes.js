import { dateDisplay } from 'utils/constant';
import { NODE_CONSTANTS } from 'utils/constants/nodes';
import { FORMATS_DATE_TIME } from 'utils/constants/dateTime';
import { MOMENT_HELPERS } from 'utils/helpers/moment';

// region Times
const calculateDuration = (a, b) => {
  const diff = MOMENT_HELPERS.diff(a, b);
  return MOMENT_HELPERS.createDuration(diff);
};

const calculateDayDuration = (a, b) => {
  const dayDiff = MOMENT_HELPERS.diffInUnit(a, b);
  return MOMENT_HELPERS.createDuration(dayDiff, 'd');
};

const calculateDayCount = (startTime, endTime) =>
  MOMENT_HELPERS.diffInUnit(startTime.value, endTime.value, 'd') + 1;

const checkDayCount = (dayCountType, dayCount) => {
  switch (dayCountType) {
    case NODE_CONSTANTS.DAY_COUNT_TYPES.singleDay:
      return dayCount === 0;
    case NODE_CONSTANTS.DAY_COUNT_TYPES.multiDay:
      return dayCount > 0;
    default:
      return true;
  }
};

const hasTimeComponent = mode => {
  switch (mode) {
    case NODE_CONSTANTS.TIME_MODES.fixedDate:
    case NODE_CONSTANTS.TIME_MODES.relative:
    case NODE_CONSTANTS.TIME_MODES.unanchored:
      return false;

    default:
      return true;
  }
};

const hasDateComponent = mode => {
  switch (mode) {
    case NODE_CONSTANTS.TIME_MODES.unanchored:
    case NODE_CONSTANTS.TIME_MODES.unanchoredAtTime:
      return false;

    default:
      return true;
  }
};

const isAnchored = mode => {
  switch (mode) {
    case NODE_CONSTANTS.TIME_MODES.unanchored:
    case NODE_CONSTANTS.TIME_MODES.unanchoredAtTime:
      return false;

    default:
      return true;
  }
};

const isFixed = mode => {
  switch (mode) {
    case NODE_CONSTANTS.TIME_MODES.fixedDateTime:
    case NODE_CONSTANTS.TIME_MODES.fixedDate:
    case NODE_CONSTANTS.TIME_MODES.fixedTime:
      return true;

    default:
      return false;
  }
};

const isRelative = mode => !isFixed(mode);

const hasDuration = (startMode, endMode) =>
  endMode === NODE_CONSTANTS.TIME_MODES.relativeStart ||
  (hasTimeComponent(startMode) && hasTimeComponent(endMode));

const checkHasTime = (hasTime, mode) => {
  if (hasTime !== NODE_CONSTANTS.HAS_TIMES.all) {
    const value = hasTimeComponent(mode);

    if (value && hasTime !== NODE_CONSTANTS.HAS_TIMES.withTime) {
      return false;
    }

    if (!value && hasTime !== NODE_CONSTANTS.HAS_TIMES.withoutTime) {
      return false;
    }
  }

  return true;
};

// TODO: Simplify - remove unnecessary logic
const renderTime = (time, mode, opts = {}) => {
  const {
    omitDate = false,
    displayDate = dateDisplay.startDate,
    index = null,
  } = opts;

  const hasTime = hasTimeComponent(mode);
  if (omitDate || !hasDateComponent(mode)) {
    if (!hasTime) return null;
    return MOMENT_HELPERS.renderTimeZone(time);
  }
  switch (displayDate) {
    case dateDisplay.startDate: {
      const isYearDisplayable = MOMENT_HELPERS.isYearDisplayable(time);
      if (hasTime) {
        if (!isYearDisplayable) {
          const separator = FORMATS_DATE_TIME.SEPARATORS.DATE_TIME;
          const timeZone = MOMENT_HELPERS.renderTimeZone(time);
          return `???${separator}${timeZone}`;
        }
        return MOMENT_HELPERS.renderDayDateShortTimeZone(time);
      }
      if (!isYearDisplayable) return 'Day ???';
      return MOMENT_HELPERS.renderDayDateShort(time);
    }
    case dateDisplay.weekDay: {
      let date;
      if (hasTime) date = MOMENT_HELPERS.renderDayTimeZone(time);
      else date = MOMENT_HELPERS.renderDay(time);
      return renderDayIndexDate(index, date);
    }
    default: {
      let date;
      if (hasTime) date = MOMENT_HELPERS.renderTimeZone(time);
      else date = '';
      return renderDayIndexDate(index, date, { hasDate: false });
    }
  }
};

const renderDayIndex = index => `Day ${index + 1}`;

const renderDate = (
  date,
  displayDate,
  dayDateFormat = FORMATS_DATE_TIME.DAY_DATE,
) => {
  if (date) {
    const dateFormat =
      displayDate === dateDisplay.weekDay
        ? FORMATS_DATE_TIME.DAY
        : dayDateFormat;
    return date.format(dateFormat);
  }
  return '';
};

const renderDayIndexDate = (index, date, opts = {}) => {
  const { hasDate = true } = opts;
  const renderIndex = () =>
    index > 100 || index < 0 ? 'Day ???' : renderDayIndex(index);
  const getSeparator = () =>
    hasDate
      ? FORMATS_DATE_TIME.SEPARATORS.DAY_DATE
      : FORMATS_DATE_TIME.SEPARATORS.DATE_TIME;
  const day = index || index === 0 ? renderIndex() : '';
  const separator = day && date ? getSeparator() : '';
  return `${day}${separator}${date}`;
};
// endregion

export const NODE_HELPERS = {
  calculateDuration,
  calculateDayDuration,
  calculateDayCount,
  checkDayCount,
  hasTimeComponent,
  withTime: hasTimeComponent,
  hasDateComponent,
  isAnchored,
  isFixed,
  isRelative,
  hasDuration,
  checkHasTime,
  renderTime,
  renderDayIndex,
  renderDate,
  renderDayIndexDate,
};
