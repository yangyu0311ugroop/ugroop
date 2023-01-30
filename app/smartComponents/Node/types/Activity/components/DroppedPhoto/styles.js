const styles = {
  root: {},
  grow: {
    flex: '1',
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
    background: '#00000075',
    color: 'white',
    top: 6,
    right: 6,
    padding: '7px 8px',
    borderRadius: 3,
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
  marginRight: {
    margin: 4,
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
  rte: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    border: 'none',
    margin: '4px 8px',
  },
};

export default styles;
