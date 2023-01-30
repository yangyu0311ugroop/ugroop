/**
 * Created by stephenkarpinskyj on 19/8/18.
 */

import { ARRAY_HELPERS } from 'utils/helpers/arrays';
import { FORMATS_DATE_TIME } from 'utils/constants/dateTime';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { pluralizeText } from 'utils/stringAdditions';
import { INPUT_UTILS } from 'ugcomponents/Inputs';

const pathToEventInputName = path => {
  const pathArray = ['data', ...ARRAY_HELPERS.arrayIfNot(path)];
  return INPUT_UTILS.storePathToInputName(pathArray);
};
const pathToTempInputName = path => {
  const pathArray = ['temp', ...ARRAY_HELPERS.arrayIfNot(path)];
  return INPUT_UTILS.storePathToInputName(pathArray);
};

const pathToFlightBookingInputName = path =>
  INPUT_UTILS.storePathToInputName(path);

/**
 * Renders local time in a local timeZoneId (omits date and time if no different)
 */
const renderHomeTime = (dateTime, timeZoneId) => {
  if (dateTime) {
    const localDateTime = MOMENT_HELPERS.isPrehistoric(dateTime)
      ? MOMENT_HELPERS.setDate(dateTime)
      : dateTime;
    const homeDateTime = MOMENT_HELPERS.setTimeZone(
      localDateTime,
      timeZoneId,
      false,
    );
    const minuteDiff = homeDateTime.utcOffset() - localDateTime.utcOffset();

    if (minuteDiff) {
      const dayDiff = homeDateTime.dayOfYear() - localDateTime.dayOfYear();

      let rendered = '';

      if (dayDiff) {
        const sign = dayDiff > 0 ? '+' : '';
        const days = pluralizeText('day', dayDiff, true);
        const separator = FORMATS_DATE_TIME.SEPARATORS.DATE_TIME;
        rendered += `${sign}${dayDiff} ${days}${separator}`;
      }
      rendered += MOMENT_HELPERS.renderTimeZone(homeDateTime);

      return rendered;
    }
  }

  return null;
};

const setEventCreate = (open, dayId, onOpen, props) => ({
  createOpen: open,
  createDayId: dayId,
  createTime: Date.now(),
  createOpenHandler: onOpen,
  ...props,
});

const setEventView = (open, id) => ({
  viewOpen: open,
  viewId: id,
  viewTime: Date.now(),
});

const setEventEdit = (open, id) => ({
  editOpen: open,
  editId: id,
  editTime: Date.now(),
});

const setFlightBookingCreate = (open, onCreate) => ({
  flightBookingCreateOpen: open,
  flightBookingCreateHandler: onCreate,
  flightBookingCreateTime: Date.now(),
});

const setFlightBookingView = (open, dataId) => ({
  flightBookingViewOpen: open,
  flightBookingViewId: dataId,
  flightBookingViewTime: Date.now(),
});

const setFlightBookingEdit = (open, dataId) => ({
  flightBookingEditOpen: open,
  flightBookingEditId: dataId,
  flightBookingEditTime: Date.now(),
});

export const EVENT_STORE_HELPERS = {
  pathToEventInputName,
  pathToTempInputName,
  pathToFlightBookingInputName,
  renderHomeTime,

  setEventCreate,
  setEventView,
  setEventEdit,
  setFlightBookingCreate,
  setFlightBookingView,
  setFlightBookingEdit,
};
