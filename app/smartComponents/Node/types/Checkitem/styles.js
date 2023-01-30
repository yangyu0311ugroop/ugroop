const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  checkItem: {
    paddingBottom: 4,
    '&:hover': {
      backgroundColor: '#fbfcfd',
    },
  },
  checkLabel: {
    cursor: 'pointer',
  },
  disabled: {
    opacity: 0.5,
  },
  checkBoxRoot: {
    height: 'unset',
    width: 'unset',
    marginRight: 2,
    position: 'relative',
    top: '-3px',
    lineHeight: 1,
    paddingBottom: 0,
  },
  checkDone: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  checkDescription: {
    cursor: 'pointer',
    paddingLeft: 28,
    color: 'grey',
  },
  done: {
    opacity: 0.8,
    color: '#c2c2c2',
  },
  menuItemHeader: {
    backgroundColor: '#fbfcfd',
    cursor: 'unset',

    '&:hover': {
      backgroundColor: '#fbfcfd',
    },
  },
  menuHeader: {
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },
  badge: {
    padding: 4,
  },
  badgeItem: {
    padding: '4px 10px 4px 4px',
    lineHeight: 1,
    color: 'gray',
  },
  move: {
    paddingLeft: 2,
    paddingRight: 0,
    width: 16,
  },

  dragHandle: {
    position: 'relative',
    cursor: 'grab',
    zIndex: 1,

    /* Apply a "closed-hand" cursor during drag operation. */
    '&:active': {
      cursor: 'grabbing',
    },
  },
  hidden: {
    display: 'none',
  },
};

export default styles;
