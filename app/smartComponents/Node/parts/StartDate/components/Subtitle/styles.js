const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  thedotL: {
    fontWeight: 'bold',
    marginRight: 2,
    fontSize: 18,
    maxHeight: 16,
    marginTop: -12,

    animation: 'blinking 2s infinite',
  },
  liveBadge: {
    marginRight: 0,
    marginTop: 0,
  },
  live: {
    color: 'white',
    fontWeight: 500,
    position: 'relative',
    background: '#c90000',
    borderRadius: 2,
    padding: '2px 8px',
    paddingLeft: 15,
    marginRight: 4,
    fontSize: 10,
    whiteSpace: 'nowrap',

    '&:before': {
      animation: 'pulsate1 1.2s ease-out',
      animationIterationCount: 'infinite',
      border: '3px solid #fff',
      borderRadius: 5,
      content: "' '",
      left: 5,
      position: 'absolute',
      top: 6,
    },
  },
  ongoing: {
    color: '#F44336',
    whiteSpace: 'nowrap',
  },
};

export default styles;
