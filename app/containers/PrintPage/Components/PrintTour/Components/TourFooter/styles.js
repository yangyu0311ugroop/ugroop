const styles = {
  root: {
    padding: '0 !important',
    margin: '40px 0 0',
  },
  grow: {
    flex: 1,
  },
  label: {
    fontSize: 17,
    color: '#495873',
    paddingRight: 8,
    fontWeight: 600,
  },
  col1: {
    flexBasis: '12%',
    maxWidth: '12%',
  },
  colWith: {
    width: '100%',
    marginBottom: 24,
  },
  border: {
    border: 'solid 1px #e3e9ef',
    margin: '8px 0 8px',
    width: '100%',
    padding: 24,
  },
  dividerText: {
    margin: 0,
    fontSize: 30,
    fontWeight: 700,
    position: 'relative',
    backgroundColor: 'white',
    top: -20,
    width: '20%',
  },
  divider: {
    width: '100%',
  },
  wrapper: {
    width: '100%',
    paddingBottom: 20,
  },
  pageBreak: {
    pageBreakInside: 'avoid',
    '--webkit-print-color-adjust': 'exact',
  },
};

const styleSheet = { ...styles, '@media print': styles };
export default styleSheet;
