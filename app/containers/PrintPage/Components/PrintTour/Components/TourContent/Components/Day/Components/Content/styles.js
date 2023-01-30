const styles = {
  col1: {
    flexBasis: '12%',
    maxWidth: '12%',
    paddingRight: 16,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  dayNum: {
    fontSize: 17,
    fontColor: '#495873',
    paddingRight: 60,
  },
  urlStyles: {
    color: '#595F6F',
    display: 'flex',
    overflow: 'hidden',
    fontSize: 12,
    alignItems: 'baseline',
    fontFamily: 'IBM Plex Sans, sans-serif',
    fontWeight: 400,
    lineHeight: 1.6,
  },
  h2TextDay: {
    margin: 0,
    fontWeight: 600,
    color: '#82aaef !important',
    textAlign: 'right',
    zIndex: 1,
    backgroundColor: 'white !important',
    position: 'relative',
  },
  line: {
    borderLeft: 'solid 2px #e3e9ef',
    position: 'relative',
    left: '-41px',
    padding: '4px 0 8px 40px',
  },
  bringToTop: {
    position: 'relative',
    zIndex: 9,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 5,
  },
  dayDescription: {
    padding: '8px 0 0',
    margin: 0,
    '& p': {
      color: '#495873',
    },
  },
  video: {
    textDecoration: 'none !important',
    '& > div > div > iframe': {
      borderRadius: '4px',
    },
    '& > div > div > iframe + p': {
      display: 'none',
    },
  },
};
const styleSheet = {
  ...styles,
  '@media print': {
    ...styles,
    grow: {
      flex: 1,
      backgroundColor: '#2b344d !important',
      paddingRight: '40mm !important',
      marginTop: '1 90mm !important',
      '--webkit-print-color-adjust': 'exact',
    },
    item: {
      backgroundColor: 'white !important',
      '--webkit-print-color-adjust': 'exact',
    },
    locPrintText: {
      display: 'block !important',
      position: 'absolute',
      top: '8mm',
      marginLeft: '8mm',
    },
    video: {
      '& > div > div > iframe': {
        display: 'none !important',
      },
      '& > div > div > iframe + p': {
        display: 'block',
      },
    },
  },
};
export default styleSheet;
