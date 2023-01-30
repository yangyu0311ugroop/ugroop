const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  newTourButton: {
    marginTop: -3,
  },
  adornment: {
    color: '#acb2c1',
    maxHeight: 'unset',
  },
  navButton: {
    // background: '#ecedf0',
    background: '#fff',
    color: '#636363',
    padding: '4px 8px',
    boxShadow: 'unset',

    '&:hover': {
      background: '#d7d8db',
    },
  },
  wrapperClass: {
    border: '1px solid #e2e2e1',
    transition:
      'border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    background: '#fff',
    borderRadius: 10,
    padding: '0px 4px',
  },
  selectCustom: {
    // padding: '3px 4px',
    minWidth: 160, // 194,
  },
  input: {
    padding: '8px 0',
    fontSize: 14,
  },
  selectInput: {
    padding: '8px 0',
    fontSize: 14,
    // textAlign: 'center',
  },
  selectSm: {
    width: 150,
  },
  noTextWrap: {
    whiteSpace: 'nowrap',
  },
  groupButton: {
    fontSize: 14,
  },
};

export default styles;
