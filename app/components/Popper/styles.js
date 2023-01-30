const styles = {
  root: {
    // border: '1px solid #c5d1d8',
    boxShadow: '0 3px 12px rgba(27,31,35,0.25)',
    backgroundColor: 'white',
    padding: 16,
    marginTop: 4,
    // borderRadius: 4,
  },
  dialog: {
    backgroundColor: 'white',
    padding: 16,
    boxShadow: 'unset !important',
    marginTop: 4,
  },
  topIndex: {
    zIndex: 1600,
  },
  halfPadding: {
    padding: 8,
  },
  quarterPadding: {
    padding: 4,
  },
  mobilePopper: {
    width: '100%',
  },
  noPadding: {
    padding: '4px 0',
  },
  grow: {
    flex: '1',
  },
  popper: {
    animation: 'popperFadeIn 0.15s',
    animationTimingFunction: 'cubic-bezier(0.465, 0.183, 0.153, 0.946)',
  },

  placementBottom: {
    position: 'relative',

    '&:before': {
      content: '""',
      width: 0,
      height: 0,
      position: 'absolute',
      border: '10px solid transparent',
      borderBottom: '10px solid #e1e1e2',
      right: 'calc(50% - 10px)',
      top: -20,
    },

    '&:after': {
      content: '""',
      width: 0,
      height: 0,
      position: 'absolute',
      border: '10px solid transparent',
      borderBottom: '10px solid #fff',
      right: 'calc(50% - 10px)',
      top: -19,
    },
  },

  menuHeader: {
    color: '#4c5673',
    background: '#f6f8fa',
    borderBottom: '1px solid #e1e4e8',
    padding: '4px 8px',
    textAlign: 'center',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  menuHeaderHalfPadding: {
    margin: -8,
    marginBottom: 8,
  },
  menuHeaderNoPadding: {
    margin: 0,
    marginTop: -4,
  },

  buttonActive: {
    '& button': {
      background: '#dff4ff',
    },
    // '& div': {
    //   color: 'white',
    // },
    // '& i': {
    //   color: 'white',
    // },
    '&:hover button': {
      background: '#dff4ff',
    },
  },
  buttonActiveDark: {
    '& button': {
      background: '#dff4ff',
      color: '#4c5673',
    },
    // '& div': {
    //   color: 'white',
    // },
    // '& i': {
    //   color: 'white',
    // },
    '&:hover button': {
      background: '#dff4ff',
      color: '#4c5673',
    },
  },
};

export default styles;
