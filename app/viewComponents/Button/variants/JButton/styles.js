const styles = {
  grow: {
    flex: '1',
  },

  root: {
    background: 'unset',
    color: '#0a2644',
    minHeight: 30,
    padding: '4px 12px',
    boxShadow: 'unset',

    '&:hover': {
      background: 'whitesmoke',
    },
    '&:disabled': {
      background: '#f6f8fa',
      cursor: 'not-allowed',
      color: '#5f5f5f',
      boxShadow: 'unset',
    },
  },

  borderGray: {
    border: '1px solid gainsboro',
  },

  whiteBackground: {
    background: 'white',
    boxShadow: 'unset',

    '&:hover': {
      background: 'whitesmoke',
    },
    '&:disabled': {
      backgroundColor: 'white',
      boxShadow: 'unset',
    },
  },

  grayBackground: {
    background: 'whitesmoke',
    boxShadow: 'unset',

    '&:hover': {
      background: '#ebedf0',
    },
    '&:disabled': {
      backgroundColor: 'white',
      boxShadow: 'unset',
    },
  },

  blueBackground: {
    background: '#3c88fe',
    boxShadow: '0 1px 0 0 #17509a',
    color: 'white',

    '&:hover': {
      background: '#4B7BDE',
    },
  },

  darkBackground: {
    background: 'transparent',
    boxShadow: 'unset',
    color: 'white',

    '&:hover': {
      background: '#ffffff4a',
    },
  },

  greenBackground: {
    background: '#39bd3f',
    boxShadow: '0 1px 0 0 #008c06',
    color: 'white',

    '&:hover': {
      background: '#4CAF50',
    },
  },

  mdPadding: {
    padding: '4px 12px',
  },

  lgPadding: {
    padding: '8px 16px',
  },

  bold: {
    fontWeight: 500,
  },

  textAlignLeft: {
    textAlign: 'left',
  },
};

export default styles;
