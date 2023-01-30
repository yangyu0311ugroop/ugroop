const styles = {
  root: {},
  offset: {},
  grow: {
    flex: '1',
  },
  right: {
    minWidth: 300,
    maxWidth: 300,
    width: 300,
  },
  offsetTop: {
    marginTop: -4,
  },

  placeholder: {
    fontSize: 12,
    color: '#9c9c9c',
  },
  offsetLeft: {
    marginLeft: -5,
  },
  routeButton: {
    color: 'rgba(76, 86, 115, 1)',
    fontSize: 12,
    padding: '1px 8px',
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
  content: {
    color: '#0a2644',
    fontWeight: 500,
  },

  menuHeader: {
    background: '#f7f8fa',
    margin: 0,
    borderBottom: '1px solid #e8e8e8',
    padding: '4px 8px',
    textAlign: 'center',
  },
  menuIcon: {
    color: '#0a2644',
    fontWeight: 500,
  },
  menuHeading: {
    fontWeight: 500,
  },
  menuSubtitle: {
    fontWeight: 300,
  },

  privateMenu: {
    width: 250,
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },
  actionButton: {
    background: 'white',
    boxShadow: 'unset',
    // borderLeft: '1px solid #dbdee4',
    color: '#4c5673',
    minHeight: 33,
    padding: '4px 12px',
    borderRadius: 'unset',
    wordBreak: 'keep-all',

    '&:hover': {
      background: '#ebedf0',
    },
  },
};

export default styles;
