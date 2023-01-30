const styles = theme => ({
  textFieldContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    marginLeft: '-68px !important',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      marginLeft: '-68px !important',
      paddingTop: '12px !important',
    },
  },
  dotContainer: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: '16px !important',
    },
    zIndex: 1,
  },
  selectFieldContainer: {
    '& > form > div > div > div > div': {
      '&:hover': {
        width: '40%',
      },
    },
  },
  textField: {
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      paddingTop: '16px !important',
    },
  },
});

export default styles;
