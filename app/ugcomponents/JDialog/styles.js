const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  paperRoot: {
    borderRadius: 0,
    width: '100% !important',
    margin: 0,
  },
  title: {
    padding: '16px 20px',
  },
  denseTitle: {
    padding: '8px 20px',
  },
  actions: {
    padding: '8px 20px 16px',
  },
  content: {
    padding: 24,
  },
  contentFullScreen: {
    padding: 0,
  },
  contentSm: {
    padding: 8,
  },

  logo: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  closeDialog: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  closeDialogButton: {
    padding: '2px 8px',
    zIndex: 2,
    boxShadow: 'unset',
    color: '#4c5673',
    background: 'unset',

    '&:hover': {
      background: '#ebedf0',
    },
  },
  notes: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
  textCenter: {
    textAlign: 'center',
  },

  sm: {
    width: 338,
  },
  fullWidthNotes: {
    width: '100%',
  },
};

export default styles;
