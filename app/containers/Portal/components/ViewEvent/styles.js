const styles = {
  root: {},
  grow: {
    flex: '1',
  },

  notScrollable: {
    height: '100vh',
    overflow: 'hidden',
  },

  scrollableX: {
    height: '100vh',
    overflowY: 'auto',
    overflowX: 'hidden',
  },

  left: {
    width: 407,
    boxShadow: '2px 0px 3px 0px gainsboro',
    zIndex: 1,
  },

  header: {
    background: 'white',
    boxShadow: '0px 1px 1px gainsboro',
    marginBottom: 16,
    padding: 16,
    width: '100%',
  },

  titleClassName: {
    borderBottom: '1px solid gainsboro',
  },
  contentClassName: {
    background: '#f6f8fa',
  },
  contentSm: {
    width: '100vw',
    maxWidth: '100vw',
  },

  actionButton: {
    background: 'whitesmoke',
    color: '#0a2644',
    minHeight: 30,
    padding: '2px 12px',
    paddingTop: 2,
    borderRadius: 'unset',
    boxShadow: 'unset',

    '&:hover': {
      background: '#ebedf0',
    },
  },

  flightButton: {
    background: 'transparent',
    color: '#0a2644',
    minHeight: 30,
    padding: '2px 12px',
    paddingTop: 2,
    borderRadius: 'unset',
    boxShadow: 'unset',

    '&:hover': {
      background: '#ebedf0',
    },
  },

  flightActive: {
    background: '#e9f5ff',

    '&:hover': {
      backgroundColor: '#e9f5ff',
    },
  },

  paddingDense: {
    padding: '8px 16px',
  },
  paddingLeft: {
    paddingLeft: 16,
  },
  paddingRight: {
    paddingRight: 16,
  },

  count: {
    minWidth: 100,
  },

  eventIcon: {
    width: 70,
    background: '#f9f9f9',
    textAlign: 'center',
    borderRadius: 8,
    color: '#7b838e',
  },
  eventHeight: {
    height: 44,
    width: 1,
  },

  iconLeft: {
    minWidth: 30,
    textAlign: 'center',
  },

  flightPath: {
    width: 90,
    background: '#bcbcbe',
    height: 2,
  },

  rotate90: {
    transform: 'rotate(90deg)',
  },

  detailLeft: {
    minWidth: 90,
  },

  offsetBottom: {
    marginBottom: -8,
  },
  offsetTop: {
    marginTop: -4,
  },

  closeDialogButton: {
    padding: '2px 8px',
    zIndex: 2,
    boxShadow: 'unset',
    color: '#4c5673',
    background: 'whitesmoke',

    '&:hover': {
      background: '#ebedf0',
    },
  },

  bufferEnd: {
    height: 200,
  },

  card: {
    color: '#0a2644',
    transition: '400ms cubic-bezier(.08,.52,.52,1) border',

    '&:hover': {
      background: '#fafbfc',
    },
  },
  arrowHover: {
    '& $nextButton': {
      transform: 'translateX(-2px)',
    },
    '&:hover $nextButton': {
      transform: 'translateX(2px)',
    },
  },
  nextButton: {
    transition: '300ms cubic-bezier(.08,.52,.52,1) transform',
  },

  padding: {
    padding: '0 16px',
  },
  halfPadding: {
    padding: '8px 16px',
  },

  dayActive: {
    background: '#e9f5ff',
  },
  leftHeader: {
    // background: '#f6f8fa',
    borderBottom: '1px solid gainsboro',
    paddingBottom: 4,
  },
  leftContent: {},
  dayWrapper: {
    border: '1px solid #a5a5a5',
    padding: 16,
    borderRadius: 6,
    background: 'white',
    transition: '300ms cubic-bezier(.08,.52,.52,1) all',
  },
  dayWrapperActive: {
    borderColor: '#1a77a0',
    boxShadow: '0 1px 1px 0px #2196f3',
  },
};

export default styles;
