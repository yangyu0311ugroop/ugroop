const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  customPadHorizontal: {
    padding: '0 10px',
  },
  customMarTop: {
    marginTop: 20,
  },
  smallText: {
    fontSize: 12,
    padding: '2px 8px',
    minHeight: 'unset',
    fontWeight: 500,
  },
  simpleButton: {
    border: 'unset',
    minHeight: 'unset',
    color: '#0a2644',
    padding: '1px 0px',
    background: 'unset',
    boxShadow: 'unset',

    '&:hover': {
      background: '#ebedf0',
    },
  },
  rteGrid: {
    marginTop: 8,
  },
  rte: {
    // marginTop: 8,
    margin: 8,
    minHeight: 72,
  },
  noTextWrap: {
    whiteSpace: 'nowrap',
  },
};

export default styles;
