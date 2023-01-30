const styles = {
  root: {
    margin: 0,
    pageBreakInside: 'avoid',
    '--webkit-print-color-adjust': 'exact',
  },
  col1: {
    flexBasis: '12%',
    maxWidth: '12%',
    paddingRight: 16,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  line: {
    borderLeft: 'solid 2px #e3e9ef',
    position: 'relative',
    left: '-41px',
    padding: '0px 0px 24px 40px',
  },
  texTitle: {
    margin: 0,
    fontWeight: 'bold',
    fontSize: 17,
  },
  eventContainer: {
    width: '100%',
    position: 'relative',
  },
};

const styleSheet = {
  ...styles,
  '@media print': {
    ...styles,
  },
};
export default styleSheet;
