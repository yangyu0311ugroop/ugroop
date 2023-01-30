const styles = {
  col1: {
    flexBasis: '12%',
    maxWidth: '12%',
    padding: '8px 16px 0 0',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  line: {
    borderLeft: 'solid 2px #e3e9ef',
    position: 'relative',
    left: '-41px',
    paddingLeft: '40px',
  },
  bringToTop: {
    position: 'relative',
    zIndex: 9,
  },
  section: {
    padding: '8px 0 8px',
    margin: 0,
  },
  sectionItem: {
    border: 'solid 1px #e3e9ef',
    width: '100%',
    backgroundColor: '#ffffff',
  },
  noPhoto: {
    width: '10px',
    height: '10px',
    fontWeight: 600,
    paddingTop: '6px',
    textAlign: 'center',
    marginRight: '8px',
    borderRadius: '50px',
    backgroundColor: '#ffffff',
    border: '1.5px solid #e3e9ef',
    position: 'relative',
    left: '-11px',
    zIndex: 9,
    top: 36,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 5,
  },
  locPrintText: {
    display: 'none',
  },
};
const styleSheet = {
  ...styles,
  '@media print': {
    ...styles,
    printLink: {
      '& a': {
        content: '',
        display: 'none !important',
      },
    },
    locPrintText: {
      display: 'block !important',
      position: 'absolute',
      top: '10mm',
      marginLeft: '9mm',
    },
    locNoPrintText: {
      display: 'none !important',
    },
    section: {
      padding: '8px 0 8px',
      margin: 0,
      width: '90%', // print to cinsider margin
    },
  },
};
export default styleSheet;
