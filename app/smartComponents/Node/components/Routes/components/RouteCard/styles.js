const styles = {
  root: {},
  paddingLeft: {
    paddingLeft: 16,
  },
  grow: {
    flex: 1,
  },

  header: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 600,
    color: '#9c9c9c',
    border: 'unset',
  },
  smallText: {
    fontSize: 12,
    padding: '2px 8px',
    minHeight: 'unset',
    fontWeight: 500,
  },

  card: {
    height: 100,
  },

  singleCard: {
    height: 120,
  },
  noContent: {
    color: '#9c9c9c',
    fontStyle: 'italic',
    fontSize: 12,
  },
  routes: {
    width: 'calc(100% + 32px)',
    marginLeft: -16,
    borderTop: '1px solid gainsboro',
    borderBottom: '1px solid gainsboro',
    cursor: 'pointer',
  },

  index: {
    color: '#b5b5b5',
    fontSize: 16,
    width: 24,
    fontWeight: 500,
    textAlign: 'center',
  },

  routeButton: {
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

  routesNav: {
    background: '#f6f8fa',
  },
};

export default styles;
