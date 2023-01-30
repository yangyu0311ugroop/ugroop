const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  location: {
    fontSize: 14,
    display: 'flex',
    alignItems: 'baseline',
    overflow: 'hidden',

    '& a': {
      color: '#595F6F',
    },
  },
  locationIcon: {
    marginRight: 8,

    '& img': {
      width: 14,
      height: 14,
    },
  },
  locationText: {
    textAlign: 'start',
    marginLeft: 0,
    paddingLeft: 0,
    display: 'inline-flex',
    '&:focus': {
      outline: 'none',
    },
  },
  locationTextA: {
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  placeDetailContainer: {
    display: 'none',
  },
  selectedAddress: {
    border: '1px solid grey',
  },
  tooltip: {
    backgroundColor: 'transparent',
    color: 'black',
    opacity: 1,
    marginTop: 0,
    marginBottom: 0,
    fontWeight: 400,
  },
  popper: {
    opacity: 1,
  },
  detail: {
    width: '100%',
  },
  inputLocationLabel: {
    '& label': {
      fontSize: 14,
    },
  },
  withWrap: {
    whiteSpace: 'initial',
  },
  inline: {
    padding: 0,
  },
  inlineText: {
    marginTop: 5,
  },
  iconPadding: {},
};

const mediaPrintStyles = {
  '@media print': {
    ...styles,
    locationText: {
      '&:after': {
        content: 'none !important',
      },
    },
  },
};

export default { ...styles, ...mediaPrintStyles };
