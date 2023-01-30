const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  flex: {
    display: 'flex',
  },
  dense: {
    margin: 0,
  },
  appBar: {
    boxShadow: 'none',
    backgroundColor: 'unset',
    // borderBottom: 'solid 1px #e3e9ef',
    //
    '&::after': {
      width: '100%',
      height: 0,
      position: 'absolute',
      bottom: 0.5,
      backgroundColor: 'unset',
    },
  },
  toolbar: {
    overflow: 'auto',
    padding: 0,
    minHeight: 'auto',
    flex: 1,
    border: '1px solid rgb(209, 213, 221)',
    borderTop: 'none',
    background: '#fafbfc',
    marginBottom: 8,

    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  labelContainer: {
    paddingBottom: 0,
    padding: '6px 16px 0',
  },
  helpRoot: {
    margin: '-11px 0px',
    marginLeft: 8,
  },
  tabs: {
    width: '100%',
    minHeight: 'auto',
  },
  green: {
    color: '#9ac796',
  },
  grey: {
    color: '#98a4b1',
  },
  add: {
    border: '1px solid #e3e9ef',
  },
  tab: {
    borderRight: '1px solid rgb(209, 213, 221)',
    color: '#595F6F',
    fontSize: 14,
    textTransform: 'none',
    minWidth: 'auto',
    minHeight: 'auto',
    marginLeft: 1,
    fontWeight: 'normal',
  },
  selectedTab: {
    backgroundColor: 'white',
    color: '#0a2644',
    fontWeight: 600,
  },
  lock: {
    paddingRight: 4,
  },
  tabContent: {
    display: 'flex',
  },
  firstTab: {
    'border-top-left-radius': 4,
    marginLeft: 'unset',
  },
  customTab: {
    marginRight: -1,
    paddingRight: 1,
  },
  lastTab: {
    borderLeft: 'none',
    borderRight: 'none',
  },
  tabButtons: {
    flex: 'none',
  },
  indicator: {
    display: 'none',
  },

  popper: {
    marginTop: 8,
    borderRadius: 2,
  },
  tabTimeLine: {},
  actionButton: {
    background: 'unset',
    border: 'none',
    boxShadow: 'none',
    color: '#0a2644',
    borderRadius: 'unset',
    padding: 8,
    margin: -8,

    '&:hover': {
      background: '#ebedf0',
    },
  },
  menuButton: {
    color: '#0a2644',
    textAlign: 'left',
    padding: 4,

    '&:hover': {
      background: '#ebedf0',
    },
  },
  moreMenu: {
    minWidth: 165,
  },
  contentSelected: {
    fontWeight: 'bold',
  },
  tabGrid: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  publicViewContainer: {
    maxWidth: 'unset',
    padding: 0,
  },
};

export default styles;
