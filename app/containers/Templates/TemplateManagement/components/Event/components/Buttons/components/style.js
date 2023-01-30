/**
 * Created by stephenkarpinskyj on 16/3/18.
 */

import {
  EVENT_CONSTANTS,
  UNKNOWN_EVENT_TYPE,
  UNKNOWN_EVENT_SUBTYPE,
  TRANSPORTATION_DEFAULT_COLOR,
  ACTIVITY_DEFAULT_COLOR,
  FOOD_DEFAULT_COLOR,
  ACCOMMODATION_COLORS,
} from 'utils/constants/events';
import { EVENT_HELPERS } from 'utils/helpers/events';
import {
  EVENT_ICON_SIZE,
  EVENT_ICON_SIZE_WITH_LABEL,
  EVENT_ICON_SIZE_XS,
} from '../../../constants';

export const makeEventIconStyles = () =>
  Object.values(EVENT_CONSTANTS.EVENTS).reduce(
    (acc, { type, getTypes }) => ({
      ...acc,
      ...Object.values(getTypes()).reduce(
        (acc2, { type: subtype, colors }) => ({
          ...acc2,
          ...makeEventIconStyleGroup(type, subtype, colors),
        }),
        {},
      ),
    }),
    {},
  );

export const makeUnknownEventIconStyles = () => {
  const { type } = UNKNOWN_EVENT_TYPE;
  const { type: subtype, colors } = UNKNOWN_EVENT_SUBTYPE;
  return makeEventIconStyleGroup(type, subtype, colors);
};

export const makeEventIconStyleGroup = (type, subtype, colors) => ({
  [EVENT_HELPERS.getEventSubtypeClassName(type, subtype)]: makeEventIconStyle(
    colors,
  ),
  [EVENT_HELPERS.getEventSubtypeHoverClassName(
    type,
    subtype,
  )]: makeEventIconHoverStyle(colors),
  [EVENT_HELPERS.getEventSubtypeClassBorderColorName(
    type,
    subtype,
  )]: maketriangleSolidColor(colors),
  [EVENT_HELPERS.getEventSubtypeClassSolidColorName(
    type,
    subtype,
  )]: maketriangleSolidColor(colors),
});

export const makeEventIconStyle = ({ icon }, invertColor) => ({
  // color: invertColor ? icon.background.default : invertColor,
  color: invertColor || icon.background.default,
  // border: invertColor
  //   ? `1px solid ${icon.background.default}`
  //   : '1px solid #fff',
  '&:hover': makeEventIconHoverStyle({ icon }, invertColor),
  // '&:hover i': makeEventIconHoverStyle({ icon }, invertColor),
});

export const makeEventIconHoverStyle = ({ icon }, invertColor) => ({
  // color: invertColor ? icon.background.hover : invertColor,
  backgroundColor: `${invertColor || icon.background.hover}`,
  color: 'white',
  boxShadow: 'unset',
  // border: `1px solid ${icon.background.hover}`,
});

export const maketriangleBorderColor = ({ icon }) => ({
  '&:before': {
    borderColor: `${icon.background.default} transparent`,
  },
});

export const maketriangleSolidColor = ({ icon }) => ({
  '&:after': {
    borderColor: `${icon.background.default} transparent`,
  },
});

const style = {
  // tooltip styles
  notClickable: {
    cursor: 'unset',
  },

  noTriangleStyle: {
    width: '100%',
    display: 'flex',
    alignItems: 'inherit',
    justifyContent: 'inherit',
    padding: '0 8px 0 8px',
  },

  checkmark: {
    fontWeight: '400',
    fontSize: '20px',
  },

  iconRoot: {
    color: 'white',
    position: 'absolute',
    zIndex: 2,
    top: -8,
    right: 0,
    backgroundColor: '#7aa1ea',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    padding: '2px',
  },

  durationText: {
    fontWeight: '600',
    color: '#4C5673',
    fontStyle: 'italic',
  },
  duration: {
    color: '#4b5972',
  },

  description: {
    color: '#4b5972',
  },

  eventTitle: {
    margin: '0',
    fontWeight: '600',
  },

  hr: {
    margin: '8px 0',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
  },

  locationTitle: {
    color: '#cad1d9',
    marginBottom: '8px',
    fontSize: '12px',
    fontWeight: '600',
  },
  location: {
    color: '#7aa1ea',
    textDecoration: 'underline',
    margin: 0,
  },
  // end of tooltip styles
  button: {
    width: EVENT_ICON_SIZE,
    height: 32,
    borderRadius: '4px',
    color: 'white',
    zIndex: 1,
  },

  buttonHover: {},

  buttonLeftSideOffset: {
    marginLeft: -20,
  },

  triangle: {
    position: 'relative',
    '&:after': {
      content: '""',
      position: 'absolute',
      left:
        'calc(50% - 6px)' /* value = (:before left) + (:before border-left) - (:after border-left) */,
      bottom: '-8px',
      borderWidth: '10px 6px 0',
      borderStyle: 'solid',
      borderColor: '#fff transparent',
      display: 'block',
      width: 0,
    },
  },

  triangleBorder: {
    position: 'relative',
    '&:before': {
      content: '""',
      position: 'absolute',
      left:
        'calc(50% - 6px)' /* value = (:before left) + (:before border-left) - (:after border-left) */,
      bottom: '-8px',
      borderWidth: '10px 6px 0',
      borderStyle: 'solid',
      borderColor: '#f3961c transparent',
      display: 'block',
      width: 0,
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: '-8px',
      left:
        'calc(50% - 6px)' /* value = (:before left) + (:before border-left) - (:after border-left) */,
      borderWidth: '10px 6px 0',
      borderStyle: 'solid',
      borderColor: '#fff transparent',
      display: 'block',
      width: 0,
    },
  },
  hidden: {
    display: 'none',
  },
  buttonSmall: {
    padding: '0px',
  },
  buttonSmallHover: {
    boxShadow: '0 6px 4px 0 #e3e9ef',
  },
  buttonWithLabel: {
    width: '100%',
  },
  eventLabel: {
    minWidth: 0,
    maxWidth: EVENT_ICON_SIZE_WITH_LABEL,
    marginLeft: 2,
    marginBottom: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: 12,
    cursor: 'inherit',
    fontWeight: 'normal',
  },
  buttonXSmall: {
    minWidth: EVENT_ICON_SIZE_XS,
    width: EVENT_ICON_SIZE_XS,
    height: EVENT_ICON_SIZE_XS,
  },
  buttonAdd: {
    minWidth: 100,
    width: 100,
    height: EVENT_ICON_SIZE,
    background: '#a1c99c',

    '&:hover': {
      background: '#6ba380',
    },
  },
  buttonDragging: {
    boxShadow: '0 0 4px 4px #e3e9ef',
  },

  tooltip: {
    background: 'white',
    boxShadow: '0 3px 12px rgb(143 149 156)',
    padding: 0,
    fontWeight: 400,
  },
  popper: {
    opacity: 1,
    '& > div': {
      transformOrigin: 'left top',
    },
  },
  tooltipCard: {
    backgroundColor: 'white',
    fontWeight: 400,
    whiteSpace: 'normal',
    boxShadow: '0 1px 3px 0 rgba(37,32,31,.3)',
  },
  tooltipCardContent: {
    padding: 24,
  },
  headline: {
    '& h3': {
      textAlign: 'center',
    },
  },
  attachmentContent: {
    backgroundColor: '#f8f8fa',
    color: '#4C5673',
    marginTop: 0,
    fontWeight: 400,
    zDepth: 2,
    whiteSpace: 'normal',
  },

  Add: {
    color: '#8abd84',
    backgroundColor: '#fff',
    margin: '0px 1px 0px',
    padding: '0',
    '&:hover': {
      color: '#8abd84',
    },
  },

  ...makeEventIconStyles(),
  ...makeUnknownEventIconStyles(),

  circle: {
    borderRadius: '50%',
  },

  checkOut: {
    ...makeEventIconStyle(
      EVENT_HELPERS.getEventSubtypeConstants(
        EVENT_CONSTANTS.EVENTS.ACCOMMODATION.type,
        EVENT_CONSTANTS.ACCOMMODATIONS.HOTEL.type,
      ).colors,
    ),
  },

  landing: {
    ...makeEventIconStyle(
      EVENT_HELPERS.getEventSubtypeConstants(
        EVENT_CONSTANTS.EVENTS.TRANSPORTATION.type,
        EVENT_CONSTANTS.TRANSPORTATIONS.FLIGHT.type,
      ).colors,
    ),
  },

  coachDropoff: {
    ...makeEventIconStyle(
      EVENT_HELPERS.getEventSubtypeConstants(
        EVENT_CONSTANTS.EVENTS.TRANSPORTATION.type,
        EVENT_CONSTANTS.TRANSPORTATIONS.COACH.type,
      ).colors,
    ),
  },

  busDropoff: {
    ...makeEventIconStyle(
      EVENT_HELPERS.getEventSubtypeConstants(
        EVENT_CONSTANTS.EVENTS.TRANSPORTATION.type,
        EVENT_CONSTANTS.TRANSPORTATIONS.BUS.type,
      ).colors,
    ),
  },
  vehiclehireDropoff: {
    ...makeEventIconStyle(
      EVENT_HELPERS.getEventSubtypeConstants(
        EVENT_CONSTANTS.EVENTS.TRANSPORTATION.type,
        EVENT_CONSTANTS.TRANSPORTATIONS.VEHICLE_HIRE.type,
      ).colors,
    ),
  },
  buttonFade: {
    opacity: 0.5,
  },
  confirmed: {
    background: 'white',
  },
  'Transportation.confirmedHover': {
    background: TRANSPORTATION_DEFAULT_COLOR.icon.background.default,
    color: 'white',
  },
  'Activity.confirmedHover': {
    background: ACTIVITY_DEFAULT_COLOR.icon.background.default,
    color: 'white',
  },
  'Accommodation.confirmedHover': {
    background: ACCOMMODATION_COLORS.icon.background.default,
    color: 'white',
  },
  'Food.confirmedHover': {
    background: FOOD_DEFAULT_COLOR.icon.background.default,
    color: 'white',
  },

  showButton: {
    border: '1px solid gainsboro',
    background: 'white',
  },

  addBtn: {
    '&:hover': {
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: '#a1c99c',
      paddingBottom: '34px',
    },
  },
};

export default style;
