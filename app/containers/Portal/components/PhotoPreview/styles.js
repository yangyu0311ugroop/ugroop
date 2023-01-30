const styles = theme => ({
  root: {},
  grow: {
    flex: '1',
  },
  closeButton: {
    position: 'absolute',
    top: 7,
    right: 7,
    zIndex: 3,
    '& i': {
      textShadow: '0 1px 1px #ffffff',
    },
  },
  previewImg: {
    position: 'relative',
    background: 'rgb(17, 27, 38)',

    '& $updateButton, & $downloadButton, & $photoHeader, & $deleteButton, & $updateButtonSm': {
      visibility: 'hidden',
      display: 'block',
    },
    '&:hover $updateButton, &:hover $downloadButton, &:hover $navigationButton, &:hover $photoHeader, &:hover $deleteButton, &:hover $updateButtonSm': {
      visibility: 'visible',
      display: 'block',
    },
  },
  previewImgSmall: {
    minHeight: '20vh',

    '& img': {
      maxWidth: 'calc(100vw - 47px)',
    },
  },
  previewImgLarge: {
    minWidth: 650,
    minHeight: 450,

    '& img': {
      maxWidth: 'calc(100vw - 347px)', // the right panel is 300px
    },
  },
  loadingImage: {
    position: 'absolute',
    top: 60,
    left: '50%',
    zIndex: 0,
    color: 'white',
  },
  navigationLeft: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '30%',
    zIndex: 1,
    cursor: 'pointer',

    '&:hover $navigationButtonLeft': {
      background: '#000000cf',
      opacity: 0.9,
    },
  },
  navigationRight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '30%',
    right: 0,
    zIndex: 1,
    cursor: 'pointer',

    '&:hover $navigationButtonRight': {
      background: '#000000cf',
      opacity: 0.9,
    },
  },
  photoHeader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1,
    background: 'linear-gradient(rgba(0, 0, 0, .95), rgba(0,0,0,0))',
    padding: '8px 16px 16px',
  },
  downloadButton: {
    padding: '4px 8px',
    zIndex: 2,
    top: 8,
    right: 146,
    background: 'unset',
  },
  updateButton: {
    top: 4,
    right: 54,
    bottom: 'unset',
    width: 'unset',
    borderRadius: 4,
    zIndex: 2,
    padding: '7px 8px 8px',
    background: 'unset',
  },
  updateButtonSm: {
    bottom: 'unset',
    width: 'unset',
    borderRadius: 4,
    zIndex: 2,
    background: 'unset',
    [theme.breakpoints.down('xs')]: {
      padding: '4px 8px 8px 8p !important',
      top: 12,
      right: 80,
    },
    [theme.breakpoints.up('sm')]: {
      right: 94,
      padding: '7px 8px 8px',
      top: 8,
    },
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    borderRadius: 4,
    zIndex: 2,
    background: 'unset',

    '&:hover': {
      background: '#000000cf',
    },
  },
  title: {
    color: 'white',
    fontSize: 17,
    fontWeight: 500,
  },
  deleteButtonSmall: {
    minHeight: 'unset',
    zIndex: 2,
    background: 'unset',
    boxShadow: 'unset',
    color: 'gray',

    '&:hover': {
      background: 'unset',
      color: '#F44336',
    },
  },
  subtitle: {
    fontSize: 12,
    color: '#e8e8e8',
    marginTop: -4,
  },
  createdAt: {
    fontSize: 12,
    color: '#90949c',
    marginTop: -4,
  },
  navigationButtonHover: {
    opacity: 1,
    color: 'white',

    '&:hover': {
      background: '#000000cf',
      opacity: 0.9,
    },
  },
  navigationButtonRight: {
    textAlign: 'right',
    right: 0,
  },
  navigationButtonLeft: {
    left: 0,
  },
  navigationButton: {
    borderRadius: 4,
    padding: '8px 16px',
    margin: 8,
    marginBottom: 4,
    color: 'white',
    zIndex: 2,
    cursor: 'pointer',

    top: 'calc(50% - 23px)',
    position: 'absolute',
  },
  right: {
    width: 250,
    padding: 16,
    maxWidth: 250,
  },
  rightSmall: {
    width: '100%',
  },

  relative: {
    position: 'relative',
    height: '100%',
  },

  textCenter: {
    textAlign: 'center',
  },
  dialogContent: {
    padding: 0,
  },
  dialogActionSmall: {
    justifyContent: 'flex-start',
  },
  maxHeight: {
    maxHeight: 350,
  },
});

export default styles;
