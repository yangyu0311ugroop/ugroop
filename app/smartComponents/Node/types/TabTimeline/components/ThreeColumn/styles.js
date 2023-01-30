const styles = theme => ({
  root: {},
  grow: {
    flex: '1',
  },
  publicThirdColumn: {
    marginRight: '-96px',
    [theme.breakpoints.down('sm')]: {
      marginRight: '0px',
    },
  },
  left: {
    width: 284,
    marginRight: 12,
  },
  right: {
    width: 282,
  },
  smallMargin: {
    margin: 8,
  },

  stickyGrid: {},
  stickyGridEdit: {},
  stickyGridRead: {},
  content: {
    // marginLeft: 47,
  },
  contentMaxWidth: {
    maxWidth: 500,
  },
  publicMaxWidth: {
    maxWidth: 508,
  },

  header: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 600,
    color: '#9c9c9c',
  },
  placeholder: {
    color: '#4e4747',
    fontStyle: 'italic',
    fontSize: 12,
    background: '#fffae5',
    borderRadius: 4,
  },
  smallText: {
    fontSize: 12,
    padding: '2px 8px',
    minHeight: 'unset',
    fontWeight: 500,
  },

  title: {
    color: '#0a2644',
    fontWeight: 500,
  },
  subtitle: {
    color: '#736c6c',
  },
  inline: {
    display: 'inline-block',
  },

  smallSubtitle: {
    fontSize: 12,
    color: '#9c9c9c',
    marginLeft: -6,
  },

  routeButton: {
    color: 'rgba(76, 86, 115, 1)',
    fontSize: 12,
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
  menuIcon: {
    color: '#0a2644',
  },
  noContent: {
    color: '#9c9c9c',
    fontStyle: 'italic',
    fontSize: 12,
  },
});

export default styles;
