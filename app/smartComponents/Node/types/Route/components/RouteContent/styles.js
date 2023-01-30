const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  content: {},
  title: {
    fontWeight: 400,
  },
  subtitle: {
    fontSize: 12,
    color: '#8a8a8a',
  },
  routeButton: {
    color: '#8a8a8a',
    padding: '0px 8px',
    background: 'unset',
    boxShadow: 'unset',
    minHeight: 'unset',
    fontSize: 12,

    '&:disabled': {
      color: '#9c9c9c',
    },
    '&:hover': {
      background: '#ebedf0',
    },
  },
};

export default styles;
