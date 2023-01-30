const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  menuItemHeader: {
    minWidth: 150,
    backgroundColor: '#fbfcfd',
    cursor: 'unset',

    '&:hover': {
      backgroundColor: '#fbfcfd',
    },
  },
  menuItem: {
    paddingTop: 8,
    paddingBottom: 8,
    borderBottom: '1px solid #eaecef',
  },
  menuItemText: {
    paddingLeft: 12,
  },
  menuHeader: {
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },
  menuItemSelected: {
    backgroundColor: '#668ee5',
    '&:hover': {
      backgroundColor: '#668ee5',
    },
  },
  menuItemTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
};

export default styles;
