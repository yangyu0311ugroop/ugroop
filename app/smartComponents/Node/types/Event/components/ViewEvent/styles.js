const styles = {
  root: {},
  grow: {
    flex: '1',
  },

  actionButton: {
    background: 'whitesmoke',
    color: '#0a2644',
    minHeight: 30,
    padding: '2px 12px',
    borderRadius: 'unset',
    boxShadow: 'unset',

    '&:hover': {
      background: '#ebedf0',
    },
  },

  button: {
    background: 'unset',
    color: '#0a2644',
    minHeight: 30,
    padding: '2px 12px',
    borderRadius: 'unset',
    boxShadow: 'unset',

    '&:hover': {
      background: 'whitesmoke',
    },
  },

  eventHeader: {
    // padding: '16px 0',
  },
  stickyEventHeader: {
    background: 'white',
    boxShadow: '0px 1px 0px 0px gainsboro',
  },

  eventGrid: {
    maxWidth: 800,
    minWidth: 800,
    background: 'white',
    boxShadow: '1px 0 3px 0px gainsboro',
    borderRadius: 8,
    padding: 16,
    margin: '32px 0',
  },
  eventGridSm: {
    background: 'white',
    padding: 8,
  },

  eventContent: {
    background: '#f6f8fa',
    padding: 16,
    paddingBottom: 120,
    borderRadius: 8,
    boxShadow: 'inset 0px 0px 1px 0px #8080806b',
    position: 'relative',
    minHeight: 300,
  },
  eventContentLg: {
    // maxHeight: '70vh',
  },

  slideDown: {
    animation: 'slideDown 0.3s',
    animationTimingFunction: 'cubic-bezier(0.465, 0.183, 0.153, 0.946)',
  },
  slideUp: {
    animation: 'slideUp 0.3s',
    animationTimingFunction: 'cubic-bezier(0.465, 0.183, 0.153, 0.946)',
  },

  form: {
    width: 424,
  },
  shadowRight: {
    boxShadow: '1px 0 3px 0px gainsboro',
  },

  center: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },

  offsetTop: {
    marginTop: -4,
  },
  iconLeft: {
    minWidth: 30,
    textAlign: 'center',
  },

  content: {
    maxWidth: 800,
    minWidth: 800,
  },

  borderLeft: {
    borderLeft: '2px solid #e6e6e6',
    paddingLeft: 16,
    paddingTop: 16,
    marginLeft: 6,
  },
  paddingBottom: {
    paddingBottom: 16,
  },
  noBorderLeft: {
    borderColor: 'transparent',
    paddingTop: 8,
  },
  tickGrid: {
    width: 24,
    paddingLeft: 2,
    zIndex: 1,
  },

  tick: {
    color: '#1890ff',
    width: 10,
    height: 10,
    backgroundColor: '#fff',
    border: '2px solid #1890ff',
    borderRadius: 100,
  },
  tickOffsetBottom: {
    marginBottom: -8,
  },
  tickOffsetTop: {
    marginTop: -8,
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },

  eventHeaderCancelled: {
    background: '#eff2f5',
    padding: 16,
    borderRadius: 8,
  },
  smallBadge: {
    color: 'white',
    fontWeight: 500,
    background: '#c90000',
    borderRadius: 5,
    padding: '2px 8px',
    fontSize: 10,
  },

  padding: {
    padding: '8px 16px',
  },
  tag: {
    background: '#ececec',
    borderRadius: 3,
    boxShadow: '0px 1px 0px #cacaca',
    padding: '0px 6px',
  },
};

export default styles;
