const styles = theme => ({
  modeSelectContainer: {
    paddingLeft: '0px',
    paddingRight: '8px',
  },
  layoutSelectContainer: {
    paddingRight: '8px',
    paddingLeft: '0px',
  },
  sortBySelectContainer: {
    paddingRight: 0,
    paddingLeft: 0,
  },
  popperButton: {
    color: '#595F6F',
  },
  selectContainer: {
    paddingTop: '0px',
  },
  filterContainer: {
    paddingRight: '0px',
    paddingLeft: '0px',
  },
  subheadingContainer: {
    flexDirection: 'column',
    paddingTop: '8px',
  },
  gridLg: {
    [theme.breakpoints.up('md')]: {
      marginRight: '8px !important',
    },
  },
  menuButton: {
    color: '#4c5673',
    textAlign: 'left',
    padding: 4,
  },
  addMarginLeft: {
    marginLeft: 5,
  },
  indent: {
    marginLeft: 22,
  },
});

export default styles;
