const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  photoCard: {
    boxShadow: '0 1px 2px 0 #c5c5c5',
    borderRadius: 4,
    background: 'white',
  },
  uploadPhotosDock: {
    border: '1px solid #c5c5c5',
    borderBottom: 'none',
    background: '#f9fbfc',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    padding: '4px 8px',
    paddingLeft: 16,
    boxShadow: '0 1px 4px rgba(0, 0, 0, .3)',
    cursor: 'pointer',
    pointerEvents: 'all',

    '&:hover': {
      boxShadow: '0 1px 4px rgba(0, 0, 0, .5)',
    },
  },
  uploadPhotosDockFinish: {
    background: '#f0ffe0',
  },
  drawerPaper: {
    borderTop: 'unset',
    padding: '0 16px',
    background: 'unset',
    pointerEvents: 'none',
  },

  selectButton: {
    color: '#4f9ac5',
    cursor: 'pointer',

    '&:hover': {
      color: '#286385',
    },
  },
  dialogContent: {
    background: '#f6f8fa',
    border: '2px dashed rgb(209, 213, 221)',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderRadius: 0,
    minHeight: 245,

    '&:first-child': {
      paddingTop: 16,
    },
  },
  subtitle: {
    fontStyle: 'italic',
    color: 'gray',
    marginBottom: -8,
  },
  dropzone: {
    '& > input': {
      width: 0,
    },
  },
  activeClassName: {
    '& $dialogContent': {
      border: '2px solid #0087F7',
      background: '#edf6ff',
    },
    '& $photoCard': {
      opacity: 0.5,
    },
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },
};

export default styles;
