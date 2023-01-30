const styles = {
  root: {},
  grow: {
    flex: '1',
  },

  marker: {
    position: 'relative',
    cursor: 'pointer',
    zIndex: 1,
    background: 'white',
    borderRadius: '50%',
    border: '2px solid #717171',
    fontSize: 12,
    opacity: 'unset',
    width: 18,
    height: 18,
    lineHeight: 1.5,
    transition: '300ms cubic-bezier(.08,.52,.52,1) all',
  },
  markerHover: {
    '&:hover': {
      zIndex: 4,
      color: 'white',
      background: '#2a73d7',
      borderColor: 'white',
      boxShadow: '0 2px 7px 1px rgba(0,0,0,0.3)',
    },
    '&:hover $destinationCircle': {
      background: '#2a73d7',
    },
  },
  destinationHover: {
    '&:hover': {
      color: 'unset',
      background: 'unset',
      borderColor: '#2a73d7',
    },
  },
  xsMarkerHover: {
    '&:hover': {
      width: 18,
      height: 18,
    },
    '&:hover $destinationCircle': {
      width: 8,
      height: 8,
      top: 3,
      left: 3,
    },
  },
  markerOffset: {
    transform: 'translate(-50%, -50%)',
  },
  highlight: {
    borderColor: '#2a73d7',
    zIndex: 5,
    boxShadow: '0 2px 7px 1px rgba(0,0,0,0.3)',
  },
  hovered: {
    zIndex: 6,
  },

  originBorder: {
    borderWidth: 3,
  },
  smOrigin: {
    borderWidth: 2,
  },
  xsOrigin: {
    width: 12,
    height: 12,
    borderWidth: 2,
  },
  selectedOrigin: {
    '& $destinationCircle': {
      background: '#2a73d7',
    },
  },
  destinationCircle: {
    position: 'absolute',
    width: 8,
    height: 8,
    top: 3,
    left: 3,
    background: '#717171',
    borderRadius: '50%',
  },
  xsDestinationCircle: {
    top: 1,
    left: 1,
    width: 6,
    height: 6,
  },

  waypoint: {
    paddingTop: 1,
    fontSize: 12,
    width: 24,
    height: 24,
    textAlign: 'center',
    background: 'white',
    borderColor: '#717171',
    fontWeight: 500,
  },
  waypointOffset: {
    paddingTop: 3,
  },
  selectedWaypoint: {
    color: 'white',
    background: '#2a73d7',
    borderColor: 'white',
  },
  smWaypoint: {
    width: 18,
    height: 18,
    fontSize: 8,
    borderWidth: 1,
    paddingTop: 2,
  },
  xsWaypoint: {
    width: 6,
    height: 6,
    border: 'unset',
    boxShadow: '0 0px 1px 2px rgb(119, 119, 119)',
  },
  paddingLeft: {
    paddingLeft: 1,
  },

  spacing: {
    marginLeft: 3,
    marginRight: 3,
  },
  pinOffset: {
    transform: 'translate(-50%, -50%)',
  },
  line: {
    width: 2,
    height: 2,
    margin: '4px 8px',
    borderRadius: '50%',
    background: '#717171',
  },
  lineTop: {
    marginTop: 0,
  },
  lineBottom: {
    marginBottom: 0,
  },
  lineHidden: {
    visibility: 'hidden',
  },
  lineSpacing: {
    marginLeft: 11,
    marginRight: 11,
  },
};

export default styles;
