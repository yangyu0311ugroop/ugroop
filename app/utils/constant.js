export const invisibleDivMark = 'stickyBottomMark';

export function templateDayIdAnchor(index) {
  return `scroller-node-${index}`;
}

export function inviteListAnchor(index) {
  return `Invite-${index}`;
}

export function toolBarIndex(index) {
  return `ToolBar-${index}`;
}

export const navbarScroll = 'navbarScroll';

export const otherTravelBtnScroll = 'otherTravelBtnScroll';

export const scrollOptions = {
  duration: 0,
  delay: 10,
  smooth: true,
  offset: -74,
};

export const scrollFurtherOptions = {
  ...scrollOptions,
  offset: -150, // Scrolls to element - 150 pixels down the page
};

export const scrollRouteOptions = {
  ...scrollOptions,
  offset: -250, // Scrolls to element - 150 pixels down the page
};

export const uploadStatus = {
  pending: 'pending',
  success: 'success',
  error: 'error',
  editing: 'editing',
};

export const photoSize = {
  CROP: 'CROP',
  ORIGINAL: 'ORIGINAL',
};

export const photoType = {
  jpeg: 'image/jpeg',
};

export const dateDisplay = {
  none: 'none',
  weekDay: 'weekDay',
  startDate: 'startDate',
};

export const responseErrorType = {
  JSON_ERROR: 'jsonerror',
  HTML_ERROR: 'htmlerror',
  TEXT_ERROR: 'texterror',
  RAW_ERROR: 'rawerror',
};

export const messageType = {
  SUCCESS: 'success',
  INFO: 'info',
  CRITICAL: 'critical',
  OUTLINE: 'outline',
};

export const snackBarType = {
  SUCCESS: messageType.SUCCESS,
  INFO: messageType.INFO,
  CRITICAL: messageType.CRITICAL,
  OUTLINE: messageType.OUTLINE,
};
