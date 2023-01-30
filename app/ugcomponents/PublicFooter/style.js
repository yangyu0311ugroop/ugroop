const style = {
  logo: {
    height: 'auto',
    width: 40,
    pageBreakInside: 'avoid',
  },
  root: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    backgroundColor: '#2b344d !important',
    pageBreakInside: 'avoid',
    '--webkit-print-color-adjust': 'exact',
  },
  ugroop: {
    margin: '4px 0',
    '& > span': {
      color: 'white !important',
      '--webkit-print-color-adjust': 'exact',
    },
  },
  ugroopText: {
    lineHeight: 1.57,
    textAlign: 'right',
    '& > span': {
      color: '#76809a !important',
      '--webkit-print-color-adjust': 'exact',
    },
  },
  footer: {
    // flex: 1,
    backgroundColor: '#2b344d !important',
    padding: 20,
  },
};

const styleSheet = { ...style, '@media print': style };
export default styleSheet;
