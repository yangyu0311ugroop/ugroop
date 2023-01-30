const styles = {
  root: {},
  grow: {
    flex: '1',
  },

  addButton: {
    width: 32,
    height: 32,
    position: 'relative',
    color: '#bdc6ce',
    paddingTop: 1,
    paddingLeft: 8,
    zIndex: 1,

    '&:hover': {
      color: 'gray',
    },
    '&:hover $plusIcon': {
      color: 'gray',
      border: '1px solid gray',
    },
  },

  plusIcon: {
    background: '#ffffffd9',
    border: '1px solid #bdc6ce',
    borderRadius: '50%',
    color: '#bdc6ce',
    lineHeight: '10px',
    paddingLeft: 1,

    position: 'absolute',
    bottom: 5,
    right: 5,

    '& i': {
      fontSize: 10,
    },
  },

  menuItemHeader: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 600,
    color: '#9c9c9c',
    paddingLeft: 8,
    paddingRight: 8,
    minWidth: 90,
  },
};

export default styles;
