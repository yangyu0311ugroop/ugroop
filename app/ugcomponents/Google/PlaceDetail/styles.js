const styles = {
  root: {},
  zIndex: {
    maxWidth: '100%',
    zIndex: 1,
  },
  grow: {
    flex: '1',
  },
  media: {
    height: 180,
  },
  address: {
    color: '#717e98',
    fontSize: 14,
  },
  name: {
    color: '#495873',
    fontSize: 17,
    fontWeight: 600,
  },
  closeBtn: {
    // this is to compensate the additional height provided by linear icon for its icon
    marginTop: -4,
    marginLeft: -4,
  },
  linkButton: {
    color: 'white',

    '&:hover, &:active': {
      color: 'white',
      textDecoration: 'none',
    },
  },
  locationContainer: {
    borderRadius: 4,
    border: 'solid 1px #e3e9ef',
    backgroundColor: '#ffffff',
    marginTop: 8,
    marginLeft: 0,
  },
  borderRight: {
    borderRight: 'solid 1px #e3e9ef',
  },
  detailContainer: {
    padding: 8,
    width: '100%',
  },
  label: {
    color: '#b0b9c3',
  },
  content: {
    color: '#495873',
  },
  alignRight: {
    textAlign: 'right',
  },
};

export default styles;
