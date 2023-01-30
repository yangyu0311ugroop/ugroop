const styles = {
  root: {
    position: 'relative',
    marginBottom: 8,
  },
  rootHover: {
    '&:hover $marker': {
      opacity: '0.7',
    },
  },
  grow: {
    flex: '1',
  },

  relative: {
    position: 'relative',
  },

  content: {
    // position: 'absolute',
    // bottom: 26,
    // left: 4,
    // right: 4,
    marginTop: -8,
    marginBottom: 8,
  },
  marker: {
    // opacity: 0,
    transition: 'opacity 0.2s cubic-bezier(.87,-.81,.19,1.104)',
  },
  textShadow: {
    textShadow:
      '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff',
  },
  title: {
    fontWeight: 400,
  },
  subtitle: {
    fontSize: 12,
    color: '#8a8a8a',
  },
  time: {
    color: '#607D8B',
    fontWeight: 400,
  },

  routeButton: {
    color: '#9c9c9c',
    padding: '4px 8px',
    background: 'unset',
    boxShadow: 'unset',
    minHeight: 'unset',

    '&:disabled': {
      color: '#9c9c9c',
    },
    '&:hover': {
      background: '#ebedf0',
    },
  },

  offsetTop: {},

  reCentreButton: {
    position: 'absolute',
    zIndex: 1,
    bottom: 24,
    left: 0,
    fontWeight: 500,
    textTransform: 'uppercase',
    color: '#6a99ff',
    background: 'white',
    boxShadow: '0px 2px 4px 1px rgba(132, 132, 132, 0.4)',

    '&:hover': {
      background: '#ddd',
    },
  },
  mdReCentre: {
    bottom: 36,
    left: 36,
  },

  item: {
    margin: '0 -16px 0 -16px',
    padding: '4px 16px',
    cursor: 'pointer',
    borderTop: '1px solid transparent',
    borderBottom: '1px solid transparent',
    position: 'relative',

    transition:
      '400ms cubic-bezier(.08,.52,.52,1) background-color, 400ms cubic-bezier(.08,.52,.52,1) border-top-color, 400ms cubic-bezier(.08,.52,.52,1) border-bottom-color, 400ms cubic-bezier(.08,.52,.52,1) opacity',

    '&:hover': {
      backgroundColor: '#fafbfc',
      borderTop: '1px solid #dddfe2',
      borderBottom: '1px solid #dddfe2',
    },
    '& $nextButton': {
      visibility: 'hidden',
      transform: 'translateX(-4px)',
    },
    '&:hover $nextButton': {
      visibility: 'visible',
      transform: 'translateX(0)',
    },
  },
  itemActive: {
    marginLeft: -18,
    // color: '#fe7a5c',
    borderLeft: '2px solid #98b9ff',
    backgroundColor: '#fafbfc',

    '&:hover': {
      cursor: 'unset',
      borderTop: '1px solid transparent',
      borderBottom: '1px solid transparent',
    },
  },

  seeDetailButton: {
    color: '#769ae7',
    background: 'unset',
    boxShadow: 'unset',
    minHeight: 'unset',
    fontSize: 12,
    fontWeight: 500,
    textTransform: 'uppercase',
    padding: '2px 8px',
    marginLeft: -4,

    '&:hover': {
      background: '#f3f3f3',
    },
  },

  index: {
    color: '#b5b5b5',
    fontSize: 16,
    width: 24,
    fontWeight: 500,
    textAlign: 'center',
  },

  polylineInfo: {
    position: 'absolute',
    zIndex: 1,
    bottom: 36,
    left: '50%',
    transform: 'translate(-50%, 0)',
  },

  warning: {
    // color: '#fff496',
  },
  warningDiv: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '45%',
    background: '#9e9e9ecc',
    color: '#fff496',
    fontWeight: 500,
  },

  routeContent: {
    paddingRight: 12,
  },
  nextButton: {
    color: '#b5b5b5',
    background: 'unset',
    boxShadow: 'unset',
    minHeight: 'unset',
    fontSize: 12,
    fontWeight: 500,
    borderRadius: 'unset',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    transition:
      '400ms cubic-bezier(.08,.52,.52,1) background-color, 400ms cubic-bezier(.08,.52,.52,1) transform',

    '&:hover': {
      background: '#f1f1f1cc',
    },
  },
  ellipsisViewDiv: {
    width: 190,
  },
};

export default styles;
