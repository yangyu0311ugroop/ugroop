const styles = () => ({
  grow: {
    flex: 1,
  },
  root: {
    height: '100%',
  },
  white: {
    color: '#FFF',
  },
  button: {
    paddingLeft: 2,
  },
  center: {
    display: 'flex',
    width: 'inherit',
    height: 'inherit',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -1,
  },
  image: {
    height: '100%',
    textAlign: 'center',
  },
  imgLabel: {
    margin: 0,
  },
  roundImg: {
    width: 130,
    height: 130,
    objectFit: 'cover',
    // boxShadow: 'inset 0 0 4px #c8c8c8',
  },
  circle: {
    borderRadius: '100%',
  },
  imgContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    '& i': {
      textShadow: '0 0 1px #727272',
    },
  },
  iconCircle: {
    padding: 4,
    borderRadius: '50%',
    background: '#5c5c5c8a',
  },
  iconCamera: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    background: '#5c5c5c8a',
    padding: 4,
    borderRadius: '50%',
  },
  iconMove: {
    position: 'absolute',
    bottom: 10,
    left: 40,
    background: '#5c5c5c8a',
    padding: 4,
    borderRadius: '50%',
  },
  iconDelete: {
    position: 'absolute',
    bottom: 10,
    left: 70,
    background: '#5c5c5c8a',
    padding: 4,
    borderRadius: '50%',
  },
  centerIcons: {
    bottom: 5,
    width: '100%',
    display: 'flex',
    position: 'absolute',
    justifyContent: 'center',
    '& i': {
      textShadow: '0 0 1px #727272',
    },
  },
  centerPadding: {
    padding: 4,
    borderRadius: '50%',
    background: '#5c5c5c8a',
  },
  imgContainerLarge: {
    position: 'relative',
    '& > img': {
      borderRadius: 5,
    },
  },
  iconLarge: {
    padding: 8,
    background: '#fff',
    borderRadius: '50%',
  },
  iconCameraPositionLarge: {
    left: 10,
    bottom: 8,
    margin: 0,
    position: 'absolute',
  },
  iconMovePositionLarge: {
    left: 64,
    bottom: 8,
    margin: 0,
    position: 'absolute',
  },
  hover: {
    cursor: 'pointer',
    transition: '.2s ease-in-out',

    '&:hover ': {
      backgroundColor: 'rgb(250, 250, 250)',
    },

    '&:hover $iconHidden': {
      visibility: 'visible',
    },
  },
  iconHidden: {
    visibility: 'hidden',
  },

  imgContainerRoot: {
    position: 'relative',

    '& $downloadButton': {
      display: 'none',
    },
    '&:hover $downloadButton': {
      display: 'block',
    },
  },
  clickable: {
    cursor: 'pointer',
  },

  actionButton: {
    borderRadius: 0,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
    lineHeight: 1,

    background: '#00000075',
    opacity: 1,
    color: 'white',

    '&:hover': {
      background: '#000000cf',
      opacity: 0.9,
    },
  },
  iconFix: {
    paddingBottom: '0 !important',
  },
  defaultLabel: {
    fontWeight: 300,
    marginBottom: 0,
    cursor: 'pointer',
  },
  actionButtonsNoImage: {
    cursor: 'pointer',
    padding: '4px 8px',
  },
  actionButtons: {},
  actionButtonFade: {},
  overlay: {
    background:
      'linear-gradient(to bottom, rgba(255, 255, 255, 0) 40%,rgba(0, 0, 0, 1) 100%)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },

  paper: {
    maxWidth: 'unset',
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 12,
    zIndex: 3,
    '& i': {
      color: '#ffffff',
      textShadow: '0 0 1px #727272',
    },
  },
  previewModal: {
    maxWidth: 'unset',
    maxHeight: 'unset',
    overflow: 'hidden',
  },

  noImageContainer: {
    width: '100%',
    height: 180,
    background: '#0f334d',
  },

  imagePreviewError: {
    width: 480,
    maxWidth: 'calc(100% - 24px)',
    margin: '48px 16px',
    overflow: 'hidden',
  },
  downloadButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    borderRadius: 4,
    padding: '0 4px',

    background: '#00000075',
    opacity: 1,
    color: 'white',

    '&:hover': {
      background: '#000000cf',
      opacity: 0.9,
    },
  },
});

export default styles;
