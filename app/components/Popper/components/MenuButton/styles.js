const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  routeButton: {
    color: 'rgba(76, 86, 115, 1)',
    padding: '4px 8px',
    background: 'unset',
    boxShadow: 'unset',
    minHeight: 'unset',

    '&:disabled': {
      color: '#9c9c9c',
    },
    '&:hover': {
      background: '#ebedf0',
    },
  },
  denseButton: {
    padding: '0 8px',
  },
};

export default styles;
