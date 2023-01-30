const styles = {
  grow: {
    flex: '1',
  },

  root: {
    position: 'relative',
    padding: '8px 12px',
    cursor: 'pointer',
    border: '1px solid transparent',
    borderBottom: 'none',
    borderRadius: 0,
    minWidth: 85,
    textAlign: 'center',
    color: '#385898',

    '&:active': {
      background: 'whitesmoke',
    },
  },
  hover: {
    transition:
      '200ms cubic-bezier(.08,.52,.52,1) color, 200ms cubic-bezier(.08,.52,.52,1) background',

    '&:hover': {
      background: 'whitesmoke',
      zIndex: 2,
    },
  },
  active: {
    color: '#595F6F',
    background: '#f6f8fa',
    cursor: 'default',
    boxShadow: '0 3px 0 #f6f8fa',
    borderRadius: 0,
    border: '1px solid #e0e0e1',
    borderBottom: 'none',
    zIndex: 3,

    '&:hover': {
      background: '#f6f8fa',
    },
  },
  first: {
    // borderBottomLeftRadius: 4,
  },
  last: {
    // borderRight: '1px solid rgb(234, 234, 234)',
  },

  nowrap: {
    whiteSpace: 'nowrap',
  },
  badge: {
    marginLeft: 6,
    color: '#89919c',
    fontWeight: 'normal',
    fontSize: 12,
  },

  smallSubtitle: {
    fontSize: 12,
    color: '#9c9c9c',
    marginLeft: -6,
  },

  privateMenu: {
    width: 150,
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
  dense: {
    padding: '5px 8px',
  },
  ellipsisXs: {
    display: '-webkit-box',
    overflow: 'hidden',
    wordBreak: 'break-all',
    whiteSpace: 'normal',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 1,
  },
  maxWidth: {
    maxWidth: 250,
  },
  tabItem: {
    border: '1px solid #e0e0e1',
    borderBottom: 'none',
    padding: 8,
    marginRight: 4,
    fontWeight: 'normal',
    fontSize: 12,
    minWidth: 115,
    flex: 1,
    justifyContent: 'center',
  },
  fullWidth: {
    flex: 1,
  },
  noPadding: {
    padding: 0,
  },
  activeTab: {
    color: '#595F6F',
    borderBottom: 'none',
    zIndex: 3,
  },
  lastTab: {
    marginRight: 0,
  },
  halfPaddingRight: {
    paddingRight: 4,
  },
  halfPaddingLeft: {
    paddingLeft: 4,
  },
  noMaxWidth: {
    maxWidth: 'unset',
  },
  rBlue: { color: '#4169e1' },
};

export default styles;
