const styles = {
  root: {},
  grow: {
    flex: '1',
  },

  privateMenu: {
    width: 260,
  },
  privateMenuSmDown: {
    width: '100%',
  },
  menuHeading: {
    fontWeight: 500,
  },
  menuSubtitle: {
    fontWeight: 300,
    marginTop: -4,
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

  onlyMeExplain: {
    color: 'gray',
    fontStyle: 'italic',
  },
  cross: {
    position: 'absolute',
    left: 10,
    color: 'maroon',
    fontSize: 14,
    top: '-1px',
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },
  iconOrg: {
    color: '#4169e1',
  },
  iconPrivate: {
    color: '#ff3b2f',
  },
};

export default styles;
