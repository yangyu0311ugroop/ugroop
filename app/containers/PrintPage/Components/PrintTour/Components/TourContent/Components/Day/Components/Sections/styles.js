const styles = {
  root: {
    margin: '0 !important',
  },
};

const styleSheet = {
  ...styles,
  '@media print': {
    ...styles,
    root: {
      pageBreakInside: 'avoid',
      '--webkit-print-color-adjust': 'exact',
    },
  },
};
export default styleSheet;
