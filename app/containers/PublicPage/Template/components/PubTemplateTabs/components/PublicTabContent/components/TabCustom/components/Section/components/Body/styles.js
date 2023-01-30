const styles = {
  root: {
    marginTop: 8,
  },
  grow: {
    flex: '1',
  },
  minHeight: {
    minHeight: 60,
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
  paddingRight: {
    paddingRight: '110px !important',
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
  imgPosition: {
    '& > div': {
      top: 0,
      right: 16,
      position: 'absolute',
    },
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
};

export default styles;
