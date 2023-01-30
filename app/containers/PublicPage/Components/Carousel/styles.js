const styles = {
  root: {
    '& .slick-track': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  noAction: {
    padding: '16px 0',
  },
  actionContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingRight: '5%',
  },
  container: {
    '& div:focus': {
      outline: 0,
    },
  },
  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    flex: '0 1',
    color: '#acb2c1',
    justifyContent: 'center',
    padding: 0,
    minWidth: 'unset',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  nextBtn: {
    '& i': {
      marginLeft: 8,
    },
  },
  prevBtn: {
    '& i': {
      marginRight: 8,
    },
  },
  icon: {
    margin: '0',
  },
  grow: {
    flex: '1',
  },
};

export default styles;
