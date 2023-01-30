const styles = theme => ({
  root: {},
  dialog: {
    minHeight: '70vh',
  },
  grow: {
    whiteSpace: 'nowrap',
  },
  blankslateText: {
    fontWeight: 600,
  },
  photo: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 4,
    margin: 8,
    marginBottom: 0,
    background: '#cccccc',
    height: 140,
  },
  singlePhoto: {
    height: 337,
    maxHeight: '30vh',
  },
  photoWrapper: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
  },
  img: {
    maxWidth: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    margin: '0 auto',
  },

  awaiting: {
    opacity: 0.3,
  },
  uploading: {
    opacity: 0.5,
  },
  loadingIcon: {
    position: 'absolute',
    paddingTop: 62,
    paddingLeft: 'calc(50% - 12px)',
    background: '#00000075',
    color: 'white',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  errorIcon: {
    position: 'absolute',
    background: '#f7695e',
    color: 'white',
    top: 'calc(50% - 15px)',
    left: 0,
    right: 0,
    padding: '4px 8px',
    textAlign: 'center',
  },
  trashIcon: {
    position: 'absolute',
    color: 'white',
    top: 6,
    right: 6,
    background: '#00000066',
    padding: '2px 8px 1px 8px',
    lineHeight: 'unset',
    boxShadow: 'unset',
    border: 'unset',
    borderRadius: 3,

    '&:hover': {
      background: '#f7695e',
    },
  },
  photoButton: {
    color: 'white',
    background: '#00000066',
    padding: '2px 12px 1px 12px',
    lineHeight: 'unset',
    boxShadow: 'unset',
    border: 'unset',
    borderRadius: 3,

    '&:hover': {
      background: '#000000cf',
    },
  },
  rotateLeftIcon: {
    position: 'absolute',
    left: 4,
    top: -2,
    transform: 'rotate(-45deg)',
  },
  rotateRightIcon: {
    position: 'absolute',
    right: 4,
    top: -2,
    transform: 'rotate(45deg)',
  },

  rotateButtons: {
    position: 'absolute',
    bottom: 6,
    left: 6,
  },
  rotateLeftButton: {
    position: 'absolute',
    bottom: 6,
    left: 6,
  },
  rotateRightButton: {
    position: 'absolute',
    bottom: 6,
    right: 6,
  },

  size: {
    position: 'absolute',
    color: 'white',
    top: 6,
    left: 6,
    background: '#00000066',
    padding: '2px 5px 1px 5px',
    lineHeight: 'unset',
    boxShadow: 'unset',
    borderRadius: 3,
  },

  rte: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    border: 'none',
    margin: '4px 8px',
  },

  photoCard: {
    boxShadow: '0 1px 2px 0 #c5c5c5',
    borderRadius: 4,
    background: 'white',
  },

  dialogContent: {
    background: '#f6f8fa',
    border: '2px dashed rgb(209, 213, 221)',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderRadius: 0,
    minHeight: 245,
    maxHeight: 464,

    '&:first-child': {
      paddingTop: 16,
    },
  },
  dialogRead: {
    background: 'unset',
    border: '2px dashed transparent',
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

  addCard: {
    minHeight: 170,
  },

  dropzone: {
    '& > input': {
      width: 0,
    },
  },
  dropzoneRead: {
    '& > input': {
      width: 0,
    },
  },

  subtitle: {
    fontStyle: 'italic',
    color: 'gray',
    marginBottom: -8,
  },

  selectButton: {
    color: '#4f9ac5',
    cursor: 'pointer',

    '&:hover': {
      color: '#286385',
    },
  },

  minHeight: {
    minHeight: 412,
  },

  uploadSuccess: {
    textAlign: 'center',
    margin: 32,
  },

  pointer: {
    cursor: 'pointer',
  },

  contentDiv: {
    padding: '4px 8px',
  },
  content: {
    padding: '4px 0',
  },

  success: {
    background: '#e9f9d7',
    padding: '8px 16px',
  },

  minimise: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    background: 'white',
    bottom: 0,
    right: 100,
    border: '1px solid gainsboro',
    borderBottom: 'none',
  },
  marginRight: {
    margin: 4,
  },
  customPadHorizontal: {
    padding: '0 10px',
  },
  customMarTop: {
    marginTop: 20,
  },
  button: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  uploadText: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '0px !important',
    },
  },
});

export default styles;
