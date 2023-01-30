const style = {
  root: {
    margin: '16px 0px',
    borderRadius: 4,
    padding: '8px 16px',
    fontWeight: '600',
    display: 'inline-block',
    textTransform: 'none',
    fontFamily: 'IBM Plex Sans, sans-serif',
  },
  dense: {
    margin: 4,
  },
  noMargin: {
    margin: 0,
  },
  first: {
    marginLeft: 0,
  },
  inline: {
    margin: 0,
    padding: '0',
    fontWeight: 'unset',
    lineHeight: 'unset',
    minWidth: 'unset',
    minHeight: 24,
    verticalAlign: 'unset',
  },
  blue: {
    background: '#86a6eb',
    boxShadow: {
      x: 0,
      y: 1,
      blur: null,
      spread: null,
      color: '#668EE5',
    },
    transition: 'background ease-in-out 100ms',
    color: 'white',
    '&:hover, &.focus': {
      background: '#668EE5',
    },
    '&:disabled': {
      background: '#f6f8fa',
      cursor: 'not-allowed',
      color: '#c1c1c1',
    },
  },
  blue_loading: {
    color: '#ccc',
    '&:hover, &.focus': {
      background: '#86a6eb',
    },
  },
  green: {
    background: '#39bd3f',
    boxShadow: {
      x: 0,
      y: 1,
      blur: null,
      spread: null,
      color: '#35a13f',
    },
    transition: 'background ease-in-out 100ms',
    color: 'white',
    '&:hover, &.focus': {
      background: '#35a13f',
      transition: 'ease-out 1ms',
    },
    '&:disabled': {
      background: '#35a13f',
      cursor: 'not-allowed',
      color: '#c1c1c1',
    },
  },
  violet: {
    background: '#9690DE',
    boxShadow: {
      x: 0,
      y: 1,
      blur: null,
      spread: null,
      color: '#8A85D4',
    },
    color: 'white',
    '&:hover, &.focus': {
      background: '#8A85D4',
      transition: 'ease-out 1ms',
    },
  },
  pink: {
    background: '#d75b7f',
    boxShadow: {
      x: 0,
      y: 1,
      blur: null,
      spread: null,
      color: '#ff89a8',
    },
    color: 'white',
    '&:hover, &.focus': {
      background: '#ff89a8',
      transition: 'ease-out 1ms',
    },
  },
  red: {
    color: '#ff89a8',
  },
  xsmall: {
    padding: '2px 4px',
    minHeight: 24,
    minWidth: 60,
  },
  small: {
    padding: '4px 8px',
  },
  medium: {
    padding: '16px 24px',
  },
  large: {
    padding: '24px 40px',
  },
  block: {
    display: 'block',
    width: '100%',
  },
  outLineBlue: {
    border: '1px solid #B8CCF8',
    color: '#5B80D1',
    transition: 'background ease-in-out 100ms',
    '&:hover, &.focus': {
      background: 'rgba(91, 128, 209, .12)',
    },
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
  outLineGreen: {
    backgroundColor: 'white',
    border: '1px solid #a1c99c;',
    color: '#509e47 !important',
  },
  outLineGrey: {
    border: '1px solid #ccc',
    color: '#555',
    backgroundColor: 'rgb(246, 248, 250)',

    '&:hover, &.focus': {
      backgroundColor: 'rgb(240,242,244)',
    },
  },
  outlineGrey: {
    color: '#555',
    backgroundColor: 'rgb(246, 248, 250)',

    '&:hover, &.focus': {
      color: '#d1d1d',
      backgroundColor: 'rgb(218, 218, 218)',
    },
  },
  outLineRed: {
    border: '1px solid #e4b3b8',
    color: '#e4426e !important',

    '&:hover, &.focus': {
      background: '#fff9fc',
    },
  },
  outLineWhite: {
    border: '1px solid white',
    color: 'white',
  },
  outLineViolet: {
    border: '1px solid #AFABEE',
    color: '#7873C2',
  },
  outlineOrange: {
    border: '1px solid #dd9c5d',
    color: '#dd9c5d',
    '& a': {
      color: '#dd9c5d',
      display: 'absolute',
      height: '100%',
      width: '100%',
    },
    '&:hover': {
      backgroundColor: '#dd9c5d',
      color: '#fff',
      '& a:hover': {
        color: '#fff',
        textDecoration: 'none',
      },
    },
  },
  grey: {
    color: 'rgb(157, 170, 182)',
  },
  textAlignleft: {
    textAlign: 'left',
  },
};

export default style;
