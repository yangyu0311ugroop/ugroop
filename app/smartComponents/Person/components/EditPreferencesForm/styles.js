const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  popper: {
    marginTop: 4,
    zIndex: 9999,
    fontWeight: 400,
    width: 300,
  },
  popperContainer: {
    padding: 16,
    width: 300,
  },
  seeMore: {
    marginTop: 10,
  },
  fullWidth: {
    width: '100%',
  },
  formWidth: {
    padding: '0 16px',
  },
  live: {
    color: 'white',
    fontWeight: 500,
    position: 'relative',
    background: '#fff',
    borderRadius: '50%',
    fontSize: 10,

    '&:before': {
      animation: 'pulsate1 1.2s ease-out',
      animationIterationCount: 'infinite',
      border: '6px solid green',
      borderRadius: 5,
      content: "' '",
      left: -14,
      position: 'absolute',
      top: 8,
    },
  },
  reminderText: {
    textTransform: 'none',
  },
  offsetGrid: {
    padding: 8,
  },
};

export default styles;
