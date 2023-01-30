const style = {
  chip: {
    height: 34,
    marginBottom: 3,
    backgroundColor: '#fafafa',
    border: '1px solid #ddd',
    '&:hover, &:focus': {
      backgroundColor: '#eee',
    },
    '&:active': {
      backgroundColor: '#dedede',
    },
  },
  chipOpen: {
    backgroundColor: '#eee',
  },
  avatar: {
    color: '#fafafa',
  },
  popper: {
    marginTop: 4,
    zIndex: 9999,
    fontWeight: 400,
  },
  popperContainer: {
    padding: 16,
    width: 300,
  },
  customMaxWidth: {
    maxWidth: 150,
  },
};

export default style;
