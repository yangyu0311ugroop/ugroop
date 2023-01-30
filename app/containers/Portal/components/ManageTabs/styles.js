const styles = {
  root: {},
  grow: {
    flex: '1',
  },

  dragHandle: {
    zIndex: 1,
    cursor: 'move !important',

    /* Apply a "closed-hand" cursor during drag operation. */
    // '&:active': {
    //   cursor: 'grabbing',
    // },
  },
  dragDisabled: {
    cursor: 'not-allowed !important',
  },
  reorderHeader: {
    background: '#f5f6f7',
    padding: '8px 16px',
    borderTop: '1px solid #e8e8e8',
    borderBottom: '1px solid #e8e8e8',
    color: '#777',
    marginBottom: 16,
    marginLeft: -16,
    width: 'calc(100% + 32px)',
    minHeight: 40,
  },
  reorderContent: {
    minWidth: 200,
    border: '2px dashed transparent',
  },
  reorderContentDragging: {
    background: '#e7f3ff',
    border: '2px dashed gainsboro',
  },
  item: {
    background: '#f5f6f7',
    padding: '2px 8px',
    transition:
      '400ms cubic-bezier(.08,.52,.52,1) background-color, 400ms cubic-bezier(.08,.52,.52,1) border-color',

    border: '1px solid white',
  },
  itemHover: {
    '&:hover': {
      border: '1px solid #9fdbfb',
      backgroundColor: '#f1f8ff',
      zIndex: 2,
    },
  },
  itemActive: {
    borderTop: '1px solid #ececec',
    borderBottom: '1px solid #ececec',
    boxShadow: 'inset 0 1px 2px 0px #e3e9ef',
    background: 'white',

    '&:hover': {
      border: '1px solid #9fdbfb',
      zIndex: 2,
    },
  },
  dragging: {
    border: '1px solid #9fdbfb',
    backgroundColor: '#f1f8ff',
    zIndex: 3,
  },
  index: {
    color: '#b5b5b5',
    fontSize: 16,
    width: 28,
    fontWeight: 500,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 12,
    color: '#777',
    padding: 16,
    textAlign: 'center',
  },
  marginLeft: {
    marginLeft: 16,
  },
  minIconWidth: {
    minWidth: 24,
  },
  minDragWidth: {
    minWidth: 104,
  },
  minUpdateWidth: {
    minWidth: 110,
  },
  menuItem: {
    maxWidth: 250,
  },
  menuItemXs: {
    maxWidth: 150,
  },
};

export default styles;
