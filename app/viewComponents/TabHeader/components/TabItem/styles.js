const styles = {
  root: {},
  rootPrimarySelected: {
    fontWeight: 800,
    zIndex: '99',
    transition: '1s all',
  },
  selected: {
    color: '#0a2644 !important',
    backgroundColor: '#fff !important',
  },
  label: {},
  tabItem: {
    margin: 0,
    textTransform: 'none',
    fontSize: '17px',
    fontWeight: '600',
    flexGrow: '0',
    minWidth: 'auto',
    maxWidth: 'unset',
    '& > span > div': {
      paddingLeft: '0',
      paddingRight: '0',
    },
    '& > span > div > span': {
      whiteSpace: 'pre-wrap',
    },
  },
  tabItemNoColor: {
    backgroundColor: 'transparent',
    border: '0px solid #fff',
  },
  grow: {
    flex: '1',
  },
  hidden: {
    display: 'none',
  },
};

export default styles;
