const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  body: {
    overflowY: 'auto',
    overflowX: 'hidden',
    maxHeight: '60vh',
  },
  relative: {
    position: 'relative',
  },
  fixWidth: {
    maxWidth: 500,
  },
  fixWidthSM: {
    maxWidth: 800,
  },
  fixHeight: {
    height: '40vh',
  },
  paddingFooter: {
    paddingBottom: 80,
    minHeight: 400,
  },
  btnPlacement: {
    position: 'absolute',
    right: 1,
  },
  btn: {
    backgroundColor: 'white',
    '&:hover': {
      boxShadow: '0 2px 4px 0 #e3e9ef',
      backgroundColor: 'white',
    },
  },
};

export default styles;
