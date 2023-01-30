import JText from 'components/JText';
import moment from 'moment';
import React from 'react';
import MOMENT_HELPERS from 'utils/helpers/moment';
import { NODE_HELPERS } from 'utils/helpers/nodes';

const defaultFormValue = props => {
  const { data, node, eventType, subtype, dayId, timelineId } = props;

  return {
    data: {
      name: '',
      detail: {
        type: subtype,
      },
      type: eventType,
      ...data,
    },
    node: {
      customData: {
        start: {
          tempDay: `${dayId || timelineId || ''}`,
        },
      },
      ...node,
    },
  };
};

const durationToDays = duration => {
  if (!duration) return 0;

  return moment.duration(duration).days();
};

const checkTimeChange = (value, currentValue) => {
  if (!value) {
    return null;
  }

  // not a valid value
  if (value.indexOf(':') === -1) {
    return undefined;
  }

  const momentValue = moment.utc(value, 'HH:mm');

  if (!momentValue.isSame(currentValue)) {
    return momentValue;
  }

  return undefined;
};

const renderTimeString = (mode, value) => {
  if (!value || !NODE_HELPERS.hasTimeComponent(mode)) return null;

  const duration = moment.duration(value);
  const durationMoment = moment
    .utc()
    .startOf('day')
    .add(duration);

  return durationMoment.format('HH:mm');
  //
  // const duration = moment.duration(value);
  //
  // const hours = duration.hours();
  // const minutes = duration.minutes();
  //
  // const minutesString = LOGIC_HELPERS.ifElse(
  //   minutes < 10,
  //   `0${minutes}`,
  //   minutes,
  // );
  //
  // return `${hours}:${minutesString}`;
};

const renderHomeTime = (time, timeZoneId) => {
  if (!timeZoneId || !time) {
    return null;
  }

  const timeMoment = moment.utc(time, 'HH:mm');
  const homeTime = moment()
    .tz(timeZoneId)
    .hour(timeMoment.hour())
    .minute(timeMoment.minute());
  const localTime = MOMENT_HELPERS.setTimeZone(homeTime, null, false);
  const dayDiff = localTime.dayOfYear() - homeTime.dayOfYear();

  if (localTime.format('z') === homeTime.format('z')) return null;

  return (
    <JText darkgreen sm>
      ({localTime.format('HH:mm z')}
      {dayDiff > 0 && ` / ${dayDiff} day${dayDiff > 1 ? 's' : ''} later`})
    </JText>
  );
};

const toLocalTime = (time, timeZoneId) => {
  const timeMoment = moment.utc(time, 'HH:mm');

  if (!timeZoneId) {
    // to local time
    return moment()
      .local()
      .hour(timeMoment.hour())
      .minute(timeMoment.minute())
      .second(0);
  }

  return moment()
    .tz(timeZoneId)
    .hour(timeMoment.hour())
    .minute(timeMoment.minute())
    .second(0);
};

export const EVENT_DATA_HELPERS = {
  defaultFormValue,
  durationToDays,
  checkTimeChange,
  renderTimeString,
  renderHomeTime,
  toLocalTime,
};
