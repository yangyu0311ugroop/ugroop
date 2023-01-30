const styles = {
  root: {},
  grow: {
    flex: '1',
  },

  cell: {
    border: '1px solid white',
    background: 'unset',
  },
  cellInRange: {
    cursor: 'pointer',

    '&:hover': {
      background: '#f9f9f9',
    },
  },
  inRange: {
    background: '#fffae9',

    '&:hover': {
      background: '#fffae9',
    },
  },
  startDate: {
    background: '#eb9a2d',
    fontWeight: 500,
    color: 'white',

    '&:hover': {
      background: '#eb9a2d',
    },
  },
};

export default styles;
