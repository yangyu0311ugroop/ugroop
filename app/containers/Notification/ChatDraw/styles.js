const styles = {
  root: {
    overflow: 'hidden',
    position: 'relative',
    width: 'calc(100% + 18px)',
  },
  header: {
    zIndex: 1,
    width: '100%',
    paddingRight: 18,
    position: 'absolute',
    backgroundColor: '#fff',
  },
  body: {
    paddingTop: 72,
    overflowY: 'scroll',
    overflowX: 'hidden',
  },
  grow: {
    flex: '1',
  },
  drawerPaper: {
    width: 323,
    maxWidth: '100%',
    overflowX: 'hidden',
    // for chrome
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
};

export default styles;
