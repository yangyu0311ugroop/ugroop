const styles = {
  container: {
    width: 1240,
    height: '100%',
    margin: 'auto',
    backgroundColor: 'white',
    display: 'flex',
    flexWrap: 'inherit',
  },
  item: {
    backgroundColor: 'white',
  },
  grow: {
    flex: 1,
    backgroundColor: '#2b344d',
    padding: '20px 60px 20px 20px',
  },
  textColor: {
    color: 'white',
  },
};
const styleSheet = {
  ...styles,
  '@media print': {
    ...styles,
    grow: {
      flex: 1,
      backgroundColor: '#2b344d !important',
      paddingRight: '50mm !important',
      marginTop: '1 90mm !important',
      '--webkit-print-color-adjust': 'exact',
    },
    item: {
      backgroundColor: 'white !important',
      '--webkit-print-color-adjust': 'exact',
      '& a:after': {
        display: 'none !important',
      },
    },
  },
};
export default styleSheet;
