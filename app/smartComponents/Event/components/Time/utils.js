/**
 * Created by stephenkarpinskyj on 4/9/18.
 */

import _ from 'lodash';
import { dateDisplay } from 'utils/constant';
import { pluralizeText } from 'utils/stringAdditions';
import { FIRST_DATE } from 'utils/constants/dateTime';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { NODE_CONSTANTS } from 'utils/constants/nodes';
import { NODE_HELPERS } from 'utils/helpers/nodes';

const getClosestDayId = (date, parentNodeId, dayDates) => {
  if (dayDates) {
    const dayIds = dayDates.reduce(
      (acc, { id, value }) =>
        MOMENT_HELPERS.isSame(date, value, 'd') ? [...acc, id] : acc,
      [],
    );
    if (dayIds.includes(parentNodeId)) return parentNodeId;
    if (dayIds.length) return dayIds[0];
  }
  return parentNodeId;
};

const getDate = (dayId, dayDates, defaultDate = FIRST_DATE) => {
  const date = _.find(dayDates, ({ id }) => id === dayId);
  if (date) return date.value;
  return defaultDate;
};

const renderDayOptions = (renderDate, dayDates, otherValue, showEmpty, tabId) =>
  dayDates.reduce(
    (acc, { id, value }, index) => {
      if (MOMENT_HELPERS.isBefore(value, otherValue)) return acc;
      return [
        ...acc,
        {
          value: id,
          children: renderDate(value, index, { alwaysShowIndex: true }),
        },
      ];
    },
    showEmpty ? [{ value: tabId, children: 'No day' }] : [],
  );

const renderDayDateOptions = (renderDate, dayDates) =>
  dayDates.map(({ value }, index) => ({
    value,
    children: renderDate(value, index, {
      startDateRenderFunc: MOMENT_HELPERS.renderDayDate,
    }),
  }));

const renderDayDurationOption = (
  date,
  value,
  renderDuration,
  renderDate,
  includeDate,
  index,
) => {
  const duration = NODE_HELPERS.calculateDayDuration(date, value);
  const renderedDuration = renderDuration(duration);
  if (renderedDuration) {
    if (includeDate) return `${renderedDuration} (${renderDate(value, index)})`;
    return renderedDuration;
  }
  return null;
};

const renderDayDurationOptions = (
  relativeDate,
  dayDates,
  renderDuration,
  renderDate,
  includeDate,
) => {
  if (relativeDate) {
    const options = dayDates.reduce((acc, { value }, index) => {
      const durationValue = NODE_HELPERS.calculateDayDuration(
        relativeDate,
        value,
      ).toISOString();
      const children = renderDayDurationOption(
        relativeDate,
        value,
        renderDuration,
        renderDate,
        includeDate,
        index,
      );
      if (children) return [...acc, { value: durationValue, children }];
      return acc;
    }, []);

    return _.uniqBy(options, 'value');
  }
  return [];
};

const renderDayCount = duration => {
  const days = calculateDayCount(duration) - 1;
  if (days === 0) return 'Same day';
  if (days > 0) {
    const text = pluralizeText('day', days);
    return `${days} ${text} later`;
  }
  return null;
};

const renderNightCount = duration => {
  const nights = calculateDayCount(duration) - 1;
  if (nights === 0) return 'Same day';
  if (nights > 0) {
    const text = pluralizeText('night', nights);
    return `After ${nights} ${text}`;
  }
  return null;
};

const renderDate = (outerOpts = {}) => (value, index, opts = {}) => {
  const { displayDate = null } = outerOpts;
  const {
    alwaysShowIndex = false,
    startDateRenderFunc = MOMENT_HELPERS.renderDayDateShort,
    weekDayRenderFunc = MOMENT_HELPERS.renderDay,
  } = opts;

  let dayIndex;
  let date;
  switch (displayDate) {
    case dateDisplay.startDate:
      dayIndex = alwaysShowIndex ? index : null;
      date = startDateRenderFunc(value);
      break;

    case dateDisplay.weekDay:
      dayIndex = index;
      date = weekDayRenderFunc(value);
      break;

    default:
      dayIndex = index;
      date = '';
      break;
  }
  return NODE_HELPERS.renderDayIndexDate(dayIndex, date);
};

const relativeToStart = (mode, position) =>
  mode === NODE_CONSTANTS.TIME_MODES.relativeStart &&
  position === NODE_CONSTANTS.POSITIONS.end;

const addStartDuration = (mode, position, date, startDuration) => {
  if (date && relativeToStart(mode, position)) {
    return MOMENT_HELPERS.addDurations(date, startDuration);
  }
  return date;
};

const calculateDateTime = (
  mode,
  position,
  duration,
  startDuration,
  parentNodeId,
  dayDates,
) => {
  const date = getDate(parentNodeId, dayDates);
  const parentDateTime = addStartDuration(mode, position, date, startDuration);
  if (parentDateTime) {
    return MOMENT_HELPERS.addDuration(parentDateTime, duration);
  }
  return parentDateTime;
};

const calculateDayCount = duration => (duration ? duration.asDays() + 1 : 0);

export default {
  getClosestDayId,
  getDate,
  renderDayOptions,
  renderDayDateOptions,
  renderDayDurationOptions,
  renderDayCount,
  renderNightCount,
  renderDate,
  relativeToStart,
  addStartDuration,
  calculateDateTime,
  calculateDayCount,
};
