import { SIZE_CONSTANTS } from 'sizeConstants';

const styles = ({ colors }) => ({
  root: {
    color: 'inherit',
    fontWeight: 400,
  },

  // sizes
  base: {
    fontSize: 24,
  },
  [SIZE_CONSTANTS.XXXS]: {
    fontSize: 12,
  },
  [SIZE_CONSTANTS.XXS]: {
    fontSize: 14,
  },
  extraSmall: {
    fontSize: 16,
  },
  small: {
    fontSize: 20,
  },
  medium: {
    fontSize: 24,
  },
  large: {
    fontSize: 32,
  },
  extraLarge: {
    fontSize: 40,
  },
  xl: {
    fontSize: 72,
  },

  // colors
  dark: {
    color: colors.icon.dark,
  },
  white: {
    color: '#FFFFFF',
  },
  blue: {
    color: colors.icon.blue,
  },
  lavender: {
    color: colors.icon.lavender,
  },
  success: {
    color: colors.icon.success,
  },
  gray: {
    color: colors.icon.gray,
  },
  darkGray: {
    color: colors.icon.darkGray,
  },
  alert: {
    color: '#ce3d3d',
  },

  ugLogo: {
    textDecoration: 'none !important',
  },

  // UGroop Logo Colors
  warmLogo: {
    '&:before': {
      color: '#ed1c24',
    },
    '&:after': {
      color: '#f7941e',
    },
    '& span:after': {
      color: '#ffd400',
    },
  },

  coolLogo: {
    '&:before': {
      color: '#8a84bf',
    },
    '&:after': {
      color: '#6c8bc7',
    },
    '& span:after': {
      color: '#84b799',
    },
  },

  grayLogo: {
    '&:before': {
      color: '#231f20',
    },
    '&:after': {
      color: '#737576',
    },
    '& span:after': {
      color: '#9c9e9f',
    },
  },

  // UGroop Logo Sizes
  xsLogo: {
    '&:before, :after, span:after': {
      fontSize: '1.2rem',
    },
  },

  smLogo: {
    '&:before, :after, span:after': {
      fontSize: '1.44rem',
    },
  },

  lgLogo: {
    '&:before, :after, span:after': {
      fontSize: '2.074rem',
    },
  },

  xlLogo: {
    '&:before, :after, span:after': {
      fontSize: '2.488rem',
    },
  },

  // font-weight
  bold: {
    fontWeight: 600,
  },

  paddingRight: {
    paddingRight: 4,
  },
});

export default styles;
