const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 4,
  },

  dense: {
    margin: 0,
  },

  caret: {
    marginBottom: 16,
  },

  dateTime: {
    padding: 1,
    width: 38,
    maxWidth: 38,
    borderRadius: 4,
    textAlign: 'center',
  },

  // color set
  hollowFlight: {
    color: '#7097eb',
    backgroundColor: '#ffffff',
    border: '1px solid #7097eb',
  },
  hollowHotel: {
    color: '#eb9a2d',
    backgroundColor: '#ffffff',
    border: '1px solid #eb9a2d',
  },
  solidFlight: {
    color: '#ffffff',
    backgroundColor: '#7097eb',
    border: '1px solid #7097eb',
  },
  solidHotel: {
    color: '#ffffff',
    backgroundColor: '#eb9a2d',
    border: '1px solid #eb9a2d',
  },

  // main icon class
  iconRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  icon: {
    zIndex: 2,
    padding: 8,
    borderRadius: '50%',
    '-webkit-text-stroke': 'unset',
  },

  // icon caret style
  iconBefore: {
    zIndex: 1,
    bottom: -22,
    position: 'absolute',
    border: '10px solid transparent',
  },
  iconAfter: {
    zIndex: 3,
    bottom: -20,
    position: 'absolute',
    borderTop: '18px solid #ffffff',
    border: '10px solid transparent',
  },
  solidFlightCaret: {
    borderTop: '18px solid #7097eb',
  },
  solidHotelCaret: {
    borderTop: '18px solid #eb9a2d',
  },
  hollowFlightBefore: {
    borderTop: '18px solid #7097eb',
  },
  hollowHotelBefore: {
    borderTop: '18px solid #eb9a2d',
  },
};

export default styles;
