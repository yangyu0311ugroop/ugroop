const styles = {
  root: {},
  grow: {
    flex: '1',
  },

  item: {
    padding: '8px 16px',
    cursor: 'pointer',

    transition:
      '400ms cubic-bezier(.08,.52,.52,1) background-color, 400ms cubic-bezier(.08,.52,.52,1) boxShadow',

    '&:hover': {
      backgroundColor: '#fafbfc',
      boxShadow: '0 1px 0 0 #e3e9ef, 0 -1px 0 0 #e3e9ef',
      zIndex: 2,
    },
  },
  active: {
    marginLeft: -2,
    // color: '#fe7a5c',
    borderLeft: '2px solid #98b9ff',
    backgroundColor: '#fafbfc',
    boxShadow: '0 1px 0 0 #e3e9ef, 0 -1px 0 0 #e3e9ef',

    '&:hover': {
      cursor: 'unset',
    },
  },

  hovered: {
    backgroundColor: '#fafbfc',
    boxShadow: '0 1px 0 0 #e3e9ef, 0 -1px 0 0 #e3e9ef',
    zIndex: 2,
  },

  heading: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 600,
    color: '#9c9c9c',
    padding: '8px 16px',
    borderBottom: '1px solid #e8e8e8',
  },
  subtitle: {
    fontSize: 12,
    color: '#8a8a8a',
    borderTop: '1px solid #e8e8e8',
    padding: '8px 16px',
  },
  warning: {
    color: '#c59800',
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

  routes: {
    overflowY: 'auto',
    maxHeight: 465,
    paddingBottom: 8,
  },

  stops: {
    paddingLeft: 16,
    color: '#595F6F',
    fontSize: 12,
  },
};

export default styles;
