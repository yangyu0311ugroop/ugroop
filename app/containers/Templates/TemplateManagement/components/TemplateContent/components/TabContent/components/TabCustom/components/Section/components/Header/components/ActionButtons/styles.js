const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  dragHandle: {
    cursor: 'grab',

    /* Apply a "closed-hand" cursor during drag operation. */
    '&:active': {
      cursor: 'grabbing',
    },
  },
  trashButton: {
    display: 'inline-block',
    width: 20,
    height: 20,
    minWidth: 20,
    minHeight: 20,
    margin: 0,
    padding: 0,
    '& .lnr-trash2': {
      display: 'inline-block',
      width: 20,
      height: 20,
      color: '#d0d5de',
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
};

export default styles;
