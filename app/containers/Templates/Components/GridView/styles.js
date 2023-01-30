const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  newTourGrid: {
    background: '#ecedf0',
    overflow: 'hidden',

    '&:hover': {
      background: '#d7d8db',
    },
  },

  newGrid: {
    // background: '#ecedf0',
    background: 'white',
    overflow: 'hidden',
    borderRadius: 4,
    padding: '24px 12px',
    cursor: 'pointer',
    // boxShadow: '0 1px 0 0 #c5c5c5',
    // boxShadow: '0 0 0 0 #c5c5c5',
    boxShadow: '1px 1px 3px 0px #c5c5c5',
    transition: '300ms cubic-bezier(.08,.52,.52,1) box-shadow',
    // minHeight: 240,
    margin: 'auto',
  },

  grid: {
    // minHeight: 190,
    // maxHeight: 190,
    // height: 190,
    background: 'white',
    borderRadius: 4,
    padding: 4,
    cursor: 'pointer',
    // boxShadow: '0 1px 0 0 #c5c5c5',
    // boxShadow: '0 0 0 0 #c5c5c5',
    boxShadow: '1px 1px 3px 0px white',
    // transition: '300ms cubic-bezier(.08,.52,.52,1) box-shadow',
    // borderRadius: 4,
  },
  newTour: {
    color: '#636363',
    fontWeight: 500,
    whiteSpace: 'nowrap',
  },
  newTourSubTitle: {
    color: '#636363',
    fontSize: 12,
  },
};

export default styles;
