const styles = {
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
    background: 'black',
    maxWidth: 650,

    '& $updateButton, & $downloadButton, & $navigationButton': {
      visibility: 'hidden',
      display: 'block',
    },
    '&:hover $updateButton, &:hover $downloadButton, &:hover $navigationButton': {
      visibility: 'visible',
      display: 'block',
    },
  },
  previewImgSmall: {
    minHeight: '40vh',

    '& img': {
      maxHeight: '40vh',
    },
  },
  previewImgLarge: {
    minWidth: 650,
    minHeight: 450,
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
    top: 47,
    bottom: 0,
    left: 0,
    width: '30%',
    zIndex: 1,

    '&:hover $navigationButtonLeft': {
      background: '#000000cf',
      opacity: 0.9,
    },
  },
  navigationRight: {
    position: 'absolute',
    top: 47,
    bottom: 0,
    width: '30%',
    right: 0,
    zIndex: 1,

    '&:hover $navigationButtonRight': {
      background: '#000000cf',
      opacity: 0.9,
    },
  },
  photoHeader: {
    padding: '4px 8px',
  },
  title: {
    color: 'white',
    fontSize: 17,
    fontWeight: 500,
  },
  buttonMore: {
    minHeight: 'unset',
    zIndex: 2,
  },
  subtitle: {
    fontSize: 12,
    color: '#90949c',
    marginTop: -4,
  },
  updateButton: {
    top: 12,
    left: 8,
    bottom: 'unset',
    width: 'unset',
    borderRadius: 4,
    zIndex: 2,
  },
  downloadButton: {
    padding: '4px 8px',
    zIndex: 2,
  },
  navigationButtonHover: {
    transition: 'all 0.2s ease',
    background: '#00000075',
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
    width: 300,
    padding: 16,
  },
  rightSmall: {
    padding: 16,
  },

  relative: {
    position: 'relative',
    height: '100%',
  },

  textCenter: {
    textAlign: 'center',
  },
};

export default styles;
