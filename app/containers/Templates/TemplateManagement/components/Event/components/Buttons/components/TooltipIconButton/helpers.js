import { EVENT_CONSTANTS } from 'utils/constants/events';

const showSubIconFn = (type, subtype, props = {}) => {
  const { showSubIcon } = props;

  if (!showSubIcon) return false;

  const exception = [EVENT_CONSTANTS.TRANSPORTATIONS.FLIGHT.type];

  return exception.indexOf(subtype) === -1;
};

export const EVENT_ICON_HELPERS = {
  showSubIconFn,
};
