const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  listItem: {
    padding: '2px 8px',
    // borderBottom: '1px solid #eaecef',
  },
  selectableListItem: {
    borderTop: '1px solid transparent',
    borderBottom: '1px solid transparent',
  },
  hoverableListItem: {
    '&:hover': {
      backgroundColor: '#f9f9f9',
      borderTop: '1px solid rgb(197, 197, 197)',
      borderBottom: '1px solid rgb(197, 197, 197)',
    },
  },
  secondary: {
    color: '#7d7d7d',
    padding: '2px 0',
  },
  disabled: {
    backgroundColor: '#f1f1f1',
  },
  check: {
    width: 20,
  },
  selectedText: {
    fontWeight: 'bold',
    color: 'white',
  },
  selectedSecondaryText: {
    color: 'white',
  },
  selectedContainer: {
    backgroundColor: '#668ee5',
    borderBottom: '1px solid white',
  },
  hoverSelectedListItem: {
    '&:hover': {
      backgroundColor: '#668ee5',
    },
  },
  heading: {
    marginTop: 4,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  item: {
    paddingLeft: 16,
  },
  indent: {
    paddingLeft: 16,
  },
  datePicker: {
    padding: 0,
  },
  time: {
    width: 80,
  },
};

export default styles;
