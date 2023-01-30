const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    // backgroundColor: theme.palette.background.paper
  },
  tab: {
    // background: '#ffffff',
    // marginBottom: 8,
    // marginTop: 5,
  },
  tabXS: {
    // padding: '0 8px',
  },
  stickyTab: {
    borderBottom: '1px solid rgb(209, 213, 221)',
    padding: '4px 8px',

    '-webkit-backdrop-filter': 'saturate(180%) blur(20px)',
    backdropFilter: 'saturate(180%) blur(20px)',
    background: 'rgba(255,255,255,0.8)',
  },
  publicStickyTab: {},
  manageTabsTab: {
    color: 'rgba(76, 86, 115, 1)',
    fontSize: '12px',
  },
  manageTabsTab2: {
    boxShadow: 'unset',
    // borderLeft: '1px solid #dbdee4',
    minHeight: 30,
    padding: '4px 8px',
    borderRadius: 'unset',
    wordBreak: 'keep-all',

    '&:hover': {
      background: 'whitesmoke',
    },
  },
  tabJustify: {
    justifyContent: 'space-between',
  },
  grow: {
    flex: '1',
  },
  manageTabsGrid: {},
  maxWidth: {
    maxWidth: '100%',
  },

  overflow: {
    // overflow: 'hidden',
  },
  hidden: {
    visibility: 'hidden',
  },
  actionButtons2: {
    overflow: 'hidden',
    borderRadius: 2,
    alignItems: 'baseline',
  },
  badge: {},
  stickyItem: {},
  actionButton: {
    background: 'unset',
  },
  content: {
    fontWeight: 500,
    cursor: 'pointer',
  },
  tabsButton: {
    borderLeft: '1px solid #ebedf0',
  },
  contentEllipsis: {
    maxWidth: 400,
  },
  subheader: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 600,
    color: '#9c9c9c',
    margin: 6,
    marginLeft: 16,
  },

  relative: {
    position: 'relative',
  },
  moreBadge: {
    top: 0,
    right: -4,
    width: 10,
    height: 10,
    position: 'absolute',
    backgroundColor: '#f50057',
    borderRadius: '50%',
  },
  xsPaddingMore: {},
  slideDown: {
    animation: 'slideDown 0.3s',
    animationTimingFunction: 'cubic-bezier(0.465, 0.183, 0.153, 0.946)',
  },
  smTabs: {
    overflow: 'auto',
  },
  selectedTab: {
    backgroundColor: 'white',
    color: '#0a2644',
    fontWeight: 600,
  },
  tabs: {
    width: '100%',
    minHeight: 'auto',
  },
  marginOverFlow: {
    margin: -2,
  },
  buttonPopperXS: {
    minWidth: 0,
  },
  buttonXs: {
    background: 'whitesmoke', // '#E0E1E1',
  },
  buttonHelpXs: {
    background: 'whitesmoke',
    padding: '12px 4px',
  },
  helpBtn: {
    height: 20,
    width: 20,
    background: '#f6f8fa',

    '&:hover': {
      backgroundColor: '#bed5e4', // '#f6f8fa50',
    },
  },
  tabHelp: {
    minWidth: 'unset',
    padding: '8px 4px',
  },
};

export default styles;
