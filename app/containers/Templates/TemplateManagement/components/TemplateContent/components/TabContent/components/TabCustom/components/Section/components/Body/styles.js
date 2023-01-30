const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  maxWidth: {
    // maxWidth: 660,
  },
  description: {
    background: 'unset',
    padding: 0,
  },
  smallImage: {
    width: 88,
    height: 88,
    cursor: 'pointer',
  },
  attachment: {
    border: '2px dashed #e3e9ef',
    borderRadius: 5,
    padding: 8,
    color: '#afabee',
    fontWeight: 600,
    textAlign: 'center',
  },
  body: {
    marginRight: 8,
  },
  placeholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
  },
  uploadLabel: {
    cursor: 'pointer',
  },
  photoPreview: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  imgPreview: {
    borderRadius: 5,
  },
  photoButtons: {
    position: 'absolute',
    width: '100%',
    height: 30,
    bottom: 0,
    left: 0,
    color: 'white',
    backgroundColor: '#80808080',
    textAlign: 'center',
  },
  relative: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  photoIcon: {},
  photoButton: {
    minWidth: 20,
    minHeight: 20,
    padding: 0,
    color: 'white',
    margin: 4,
  },
  previewModal: {
    width: 800,
    maxWidth: 'unset',
    maxHeight: 'unset',
    overflow: 'hidden',
  },
  customDialog: {
    width: 800,
    maxWidth: 'unset',
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
  urlStyles: {
    color: '#595F6F',
    display: 'flex',
    overflow: 'hidden',
    fontSize: 12,
    alignItems: 'baseline',
    fontFamily: 'IBM Plex Sans, sans-serif',
    fontWeight: 400,
    lineHeight: 1.6,
    cursor: 'pointer',
  },
  locationContainer: {
    paddingBottom: '0px !important',
  },
  urlContainer: {
    paddingBottom: '0px !important',
    paddingTop: '0px !important',
  },
  dayContentTitle: {
    flex: '1',
    margin: 0,
    color: '#202840',
  },
  imgDiv: {
    cursor: 'pointer',
  },
  video: {
    '& > div > div > iframe': {
      borderRadius: '4px',
    },
    '& > div > div > iframe + p': {
      display: 'none',
    },
  },
  nowrap: {
    whiteSpace: 'nowrap',
  },
  '@media print': {
    ...styles,
    video: {
      '& > div > div > iframe': {
        display: 'none !important',
      },
      '& > div > div > iframe + p': {
        display: 'block',
      },
    },
  },
};
export default styles;
