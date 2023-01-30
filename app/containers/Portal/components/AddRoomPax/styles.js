const styles = {
  root: {},
  grow: {
    flex: '1',
  },

  fade: {
    opacity: 0.3,
  },
  heading: {
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: 500,
    color: '#8a8a8a',
  },
  button: {
    color: '#0a2644',
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
};

export default styles;
