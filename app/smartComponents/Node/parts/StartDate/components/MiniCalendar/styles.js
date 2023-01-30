const styles = {
  root: {},
  grow: {
    flex: '1',
  },

  table: {
    borderCollapse: 'collapse',
  },
  dayContent: {
    fontSize: 12,
    height: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  dayContentEnabled: {
    cursor: 'pointer',
  },
  today: {
    fontWeight: 500,
    margin: '0 auto',
  },

  cellActive: {
    fontWeight: 500,
    color: 'red',
  },

  cellTodayActive: {
    color: 'red',
  },

  button: {
    borderRadius: 0,
    width: 43,
    height: 47,
    background: 'transparent',
    padding: 8,
    paddingTop: 2,
    transition: '200ms cubic-bezier(.08,.52,.52,1) background',
    boxShadow: 'unset',
    lineHeight: 'unset',
    alignItems: 'baseline',

    '&:hover': {
      background: '#fafbfc',
      boxShadow: '0 0 3px 0px #833dff',
    },
  },
  active: {
    background: '#331c96',
    cursor: 'unset',

    '&:hover': {
      background: '#331c96',
      boxShadow: 'unset',
    },
  },

  circle: {
    width: 5,
    height: 5,
    borderRadius: '50%',
    margin: 2,
  },
  circleActivity: {
    background: '#64aa9d',
  },
  circleAccommodation: {
    background: '#f0af6e',
  },
  circleTransportation: {
    background: 'rgb(100, 147, 247)',
  },
  circleFood: {
    background: '#ea989a',
  },

  marginTop: {
    marginTop: 4,
  },
  showMore: {
    lineHeight: 0,
    fontSize: 7,
  },
};

export default styles;
