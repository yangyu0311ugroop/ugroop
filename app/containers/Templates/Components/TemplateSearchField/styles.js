const styles = {
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
  },
  adornment: {
    color: '#acb2c1',
  },
  /* input: {
    backgroundColor: '#fff',
    fontFamily: "'IBM Plex Sans',sans-serif",
  }, */
  inputLine: {
    width: '216px',
    '&:before': {
      backgroundColor: 'transparent',
    },
  },
  grow: {
    flex: '1',
  },
  wrapperClass: {
    border: '1px solid #e2e2e1',
    transition:
      'border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    background: '#fff',
    borderRadius: 10,
    padding: '0px 4px',
  },
  input: {
    padding: '8px 0',
    fontSize: 14,
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
};

export default styles;
