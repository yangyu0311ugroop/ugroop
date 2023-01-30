const styles = {
  root: {},

  padding_none: {
    padding: 0,
  },
  padding_xs: {
    padding: 0,
  },
  padding_sm: {
    padding: '0 4px',
  },
  padding_md: {
    padding: '4px 8px',
  },
  padding_lg: {
    padding: '8px 16px',
  },

  disabled: {
    opacity: 0.5,
  },
  offsetLeft: {
    marginLeft: -4,
  },
  offsetRight: {
    marginRight: -4,
  },

  spanBlock: {
    '& > span': {
      display: 'block',
      wordBreak: 'break-word',
    },
  },
  displayBlock: {
    display: 'block',
  },

  // color
  inherit: {
    color: 'inherit',
  },
  default: {
    color: '#444',
  },
  primary: {
    color: '#0366d6',
  },
  secondary: {
    color: '#8c8c8c',

    '&:hover': {
      color: '#444',
    },
  },
  danger: {
    color: '#cb2431',
    transition: 'ease-out 100ms',
    '&:hover, &.focus': {
      color: '#ff5264',
    },
  },
  info: {},
  success: {
    color: '#47943c',
  },
  grey: {
    color: '#c5cddc',
  },

  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },

  // size
  xs: {},
  sm: {
    fontSize: 12,
  },
  md: {},
  lg: {},

  darkMode: {
    color: 'white',

    '&:hover': {
      color: 'white',
    },
  },

  hover: {
    transition: 'unset',

    '&:hover': {
      backgroundColor: '#E0E8ED',
    },
  },
  hoverDarkMode: {
    '&:hover': {
      color: 'white',
      backgroundColor: '`#FFFFFF20`',
    },
  },

  hoverGrayMode: {
    '&:hover': {
      color: '#252424',
      backgroundColor: '#3e3c387d',
    },
  },

  textAlign_left: {
    textAlign: 'left',
  },
  textAlign_center: {
    textAlign: 'center',
  },
};

export default styles;
