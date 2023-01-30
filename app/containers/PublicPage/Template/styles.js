const styles = theme => ({
  container: {
    /* margin: 0,
    height: '100%',
    display: 'flex',
    flexDirection: 'initial', */
    width: 1140,
    height: '100%',
    margin: 'auto',
    backgroundColor: '#f6f8fa',
    display: 'flex',
    flexWrap: 'inherit',
    [theme.breakpoints.down('sm')]: {
      width: 'unset',
    },
  },
  footer: {
    width: '100%',
    alignSelf: 'flex-end',
  },
  padding: {
    padding: '0 5%',
  },
  paddingBottom: {
    paddingBottom: 0,
  },
  content: {
    minHeight: 360,
  },
});

export default styles;
