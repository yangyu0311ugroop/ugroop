const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  noRoute: {
    color: 'red',
  },
  dialogContent: {
    background: '#f6f8fa',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderRadius: 0,
    minHeight: 245,

    '&:first-child': {
      paddingTop: 16,
    },
  },
  card: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  dayGridCard: {
    position: 'relative',
    cursor: 'pointer',
    width: 12,
    height: 12,
    zIndex: 1,
    background: '#9E9E9E',
    border: '2px solid #ffffff',
    borderRadius: '50%',
    marginLeft: -6,
    marginTop: -6,
    transition: 'all .1s ease-in',
  },
  highlightMarker: {
    background: '#6493f7',
  },

  left: {
    zIndex: 1,
    width: 400,
    position: 'absolute',
    top: 20,
    bottom: 24,
    left: 20,
    maxWidth: 'calc(100% - 40px)',
  },
  paperRoot: {
    height: '100vh',
    margin: 0,
    borderRadius: 0,
  },
  maxHeight: {
    maxHeight: '100%',
    overflow: 'auto',
  },
  maxWidth: {
    maxWidth: '100%',
  },

  hidden: {
    visibility: 'hidden',
    overflow: 'hidden',
    height: 0,
  },

  googleDirection: {
    background: '#f3f3f3',
  },

  seeDetailButton: {
    color: '#769ae7',
    background: 'unset',
    boxShadow: 'unset',
    fontSize: 12,
    fontWeight: 500,
    textTransform: 'uppercase',

    '&:hover': {
      background: '#f3f3f3',
    },
  },

  closeDialogButton: {
    padding: '2px 8px',
    zIndex: 2,
    background: '#00000075',
    opacity: 1,
    color: 'white',

    '&:hover': {
      background: '#000000cf',
      opacity: 0.9,
    },
  },

  closeDialog: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
};

export default styles;
