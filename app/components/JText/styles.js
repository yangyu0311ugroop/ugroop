const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  bold: {
    fontWeight: 500,
  },
  bolder: {
    fontWeight: 600,
  },
  italic: {
    fontStyle: 'italic',
  },
  xs: {
    fontSize: 10,
  },
  sm: {
    fontSize: 12,
  },
  md: {
    fontSize: 14,
  },
  lg: {
    fontSize: 16,
  },
  xl: {
    fontSize: 20,
  },
  xxl: {
    fontSize: 24,
  },
  link: {
    cursor: 'pointer',

    '&:hover': {
      textDecoration: 'underline',
      // color: '#1f4498',
    },
  },
  underline: {
    textDecoration: 'underline',
  },
  blue: {
    color: '#385898',
  },
  gray: {
    color: '#595F6F',
  },
  placeholder: {
    color: 'rgba(0,0,0,.25)',
  },
  black: {
    color: '#1a2b49',
  },
  lightGray: {
    color: 'gainsboro',
  },
  darkGray: {
    color: '#4C4673',
  },
  orange: {
    color: '#fe7a5c',
  },
  darkgreen: {
    color: '#023B2A',
  },
  danger: {
    color: 'red',
  },
  white: {
    color: 'white',
  },
  success: {
    color: '#5eb77b',
  },
  halfPaddingLeft: {
    paddingLeft: 4,
  },
  paddingRight: {
    paddingRight: 8,
  },
  halfPaddingRight: {
    paddingRight: 4,
  },

  nowrap: {
    whiteSpace: 'nowrap',
  },
  textCenter: {
    textAlign: 'center',
    display: 'inline-block',
  },
  textLeft: {
    textAlign: 'left',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  spacing2: {
    letterSpacing: 2,
  },
  spacing4: {
    letterSpacing: 4,
  },
  onClick: {
    cursor: 'pointer',
  },
  noUnderlined: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
  warning: {
    color: '#c59800',
  },
};

export default styles;
