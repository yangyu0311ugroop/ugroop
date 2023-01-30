const color = {
  offwhite: '#F8F8F8',
  mercury: '#E9E9E9',
  silver: '#CACACA',
  gray: '#b3bcc5',
  metallicGray: '#8a8a8a',
  lightGray: '#f6f8fa', // backgroundColor,
  darkgray: '#4C5673',
  black: '#1F273D',
  ghostWhite: '#f7f8fa',
  tabHeadColor: '#353c54',
  btnPrimaryColor: '#a1c99c',
  templateActionBtns: 'rgba(26, 33, 53, 0.2)',
  footerBg: '#1F273D',

  white: '#FFFFFF',
  transparent: 'transparent',

  // NOTE: BLACK
  shark: '#3E465E',
  shuttleGrey: '#595F6F',
  grayChateau: '#ADB3C3',
  darkGray: '#9c9c9c',

  // by usage
  border: '#E3E9F0',

  // // NOTE: PRIMARY
  primary: '#39bd3f',
  primaryHover: '#35a13f',
  primaryDisabled: '#E2EDE5',

  // NOTE: BASE
  base: '#3c88fe',
  baseHover: '#4B7BDE',
  baseDisabled: '#B5C9F5',

  // // NOTE: Alert
  alert: '#D75B7F',
  alertHover: '#D04E74',
  alertDisabled: '#F0DCE4',

  // Rating
  ratingSelected: '#e0bf00',
  ratingHovered: '#e0bf0090',

  lavender: '#8781e5',

  pending: '#bdbc84',
  caution: '#89834a',

  darkIcon: '#515151',
  blueIcon: '#759bec',
  lavenderIcon: '#afabee',
  successIcon: '#47943c',
  grayIcon: '#E0E8ED',
  darkGrayIcon: '#b3bcc5',

  mild: '#aab20c',
  moderate: '#d17f12',
  severe: '#ff4435',
  dietary: '#55ce3d',
  borderColor: '1px solid rgba(220,220,220,0.5)',
  listMouseOverColor: '#e8e8e8',
  listActiveColor: '#e4f0f6',
  listFontColor: '#013c61',
  listActiveBlue: '#026aa7',
};

export default {
  ...color,

  title: color.shark,
  bodyText: color.shark,
  placeholder: color.grayChateau,
  label: color.cadetBlue,
  base: color.base,

  breadcrumb: {
    active: '#2f374e',
    normal: '#2f374e',
    chevron: '#2f374e',
  },
  card: {
    border: '#e3e9ef',
  },
  button: {
    defaultActive: '#5a80d2',
    primaryActive: '#008c06',
    alertHover: '#fd467c',
    alertActive: '#c14669',

    baseShadow: '#4673D1',
    primaryShadow: '#73a76d',
    alertShadow: '#c14669',
    disabled: 'rgba(255, 255, 255, .15)',
    outlineBoxShadow: '#E3E9EF',
  },
  icon: {
    dark: color.darkIcon,
    blue: color.blueIcon,
    lavender: color.lavenderIcon,
    success: color.successIcon,
    gray: color.grayIcon,
    darkGray: color.darkGrayIcon,
  },
  outLineButton: {},

  // SK: Only adding this as example
  link: {
    default: {
      normalText: '#2b344d',
      activeBackground: '#f6f8fa',
    },
  },
  text: {
    disabled: {
      color: '#B0B9C4',
    },
  },
};
