const styles = {
  root: {
    paddingBottom: 16,
  },
  grow: {
    flex: '1',
  },
  gridItem: {},
  item: {
    // margin: '-4px -16px -4px -14px',
    padding: '4px 16px',
    cursor: 'pointer',
    marginLeft: 2,

    '&:hover': {
      backgroundColor: '#fafbfc',
      boxShadow: '0 1px 0 0 #e3e9ef, 0 -1px 0 0 #e3e9ef',
      zIndex: 2,
    },
  },
  draggableItem: {
    // margin: '-4px -12px 0 -10px',
    padding: '6px 16px 8px 16px',
  },
  itemNoHover: {
    '&:hover': {
      backgroundColor: 'unset',
    },
  },
  nonActive: {
    paddingLeft: 8,
  },
  itemActive: {
    // marginLeft: -16,
    borderLeft: '2px solid #98b9ff',
    backgroundColor: '#fafbfc',
    marginLeft: 0,
    boxShadow: '0 1px 0 0 #efefef, 0 -1px 0 0 #efefef',

    '&:hover': {
      cursor: 'unset',
    },
  },
  active: {
    // marginLeft: -12,
    paddingLeft: 16,
    borderLeft: '2px solid #98b9ff',
    backgroundColor: '#fafbfc',
    marginLeft: 0,

    '&:hover': {
      cursor: 'unset',
    },
  },
  borderNonActive: {},
  borderActive: {
    borderTop: '2px solid #2196F3',
  },

  newItem: {
    // width: 'calc(100% + 32px)',
    borderRadius: 'unset',
    paddingBottom: 0,
    marginLeft: 0,
  },
  newItemHover: {
    '&:hover': {
      color: '#47943c',
    },
    '&:hover i': {
      color: '#47943c',
    },
  },

  focused: {},
  disabled: {},
  error: {},

  // override InputProps classes
  underline: {
    // inkbar on focus
    '&$focused:after': {
      borderBottom: '1px solid #cbcccd',
    },

    '&:hover:not($disabled):before': {
      borderBottom: '1px solid #cbcccd',

      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        borderBottom: '1px solid #cbcccd',
      },
    },

    // inkbar on hover
    '&:hover:not($disabled):not($focused):not($error):before': {
      borderBottom: '1px solid #cbcccd90',
    },

    // normal state inkbar
    '&:after': {
      borderBottom: '1px solid #cbcccd90',
    },
    '&:before': {
      borderBottom: '1px solid #cbcccd90',
    },
  },

  content: {
    fontSize: 12,
    wordBreak: 'break-word',
  },
  ellipsisEditDiv: {
    width: 180,
  },
  ellipsisViewDiv: {
    width: 204,
  },

  relative: {
    position: 'relative',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 32,
    right: 0,
    opacity: 0.1,
  },
  height: {
    height: '100%',
  },
  forHover: {
    overflow: 'hidden',
    content: '""',
  },
  plusTop: {
    position: 'absolute',
    top: 0,
    right: 4,
    marginTop: -9,
  },
  icon: {
    padding: 4,
    transition: '0.3s ease-in-out',
    borderRadius: '50%',
    cursor: 'pointer',
    zIndex: 2,
    position: 'relative',
  },
  iconHovered: {
    color: 'white',
    background: '#2196F3',
  },

  hidden: {
    visibility: 'hidden',
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

  marginMoveButton: {
    marginLeft: '-10px !important',
  },

  header: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 600,
    color: '#9c9c9c',
  },
  headerButton: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 600,
    color: '#9c9c9c',
    marginLeft: -8,
  },
  headerMenu: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 600,
    color: '#9c9c9c',
    paddingLeft: 8,
    paddingRight: 8,
    minWidth: 90,
  },

  headerPadding: {
    padding: 16,
    paddingBottom: 0,
  },
  paddingBottom: {
    paddingBottom: 12,
  },

  prefix: {
    textTransform: 'capitalize',
    color: '#777',
    fontSize: 10,
  },

  padding: {
    paddingLeft: 4,
    paddingRight: 4,
  },

  loading: {
    width: 20,
    height: 20,
    animation: 'spin 1s linear infinite',
  },

  indentLeft: {
    paddingLeft: 48,
  },

  priority: {
    zIndex: 1,

    '&:hover': {
      background: '#e8e8e8',
    },
  },

  printButton: {
    fontSize: 12,
    padding: '1px 8px',
    minHeight: 'unset',
  },
  smallText: {
    fontSize: 12,
  },
  subtitle: {
    fontSize: 12,
    color: '#b0b9c3',
    fontStyle: 'italic',
    zIndex: 1,
  },

  eventIcon: {
    zIndex: 1,
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

  buttonOffsetLeft: {
    marginLeft: -6,
  },
  seeDetailButton: {
    color: '#769ae7',
    background: 'unset',
    boxShadow: 'unset',
    minHeight: 'unset',
    fontSize: 12,
    fontWeight: 500,
    textTransform: 'uppercase',
    padding: '0 4px',
    marginLeft: -4,
    zIndex: 1,

    '&:hover': {
      background: '#f3f3f3',
    },
  },

  index: {
    color: '#b5b5b5',
    fontSize: 16,
    width: 24,
    fontWeight: 500,
    textAlign: 'center',
    '& i': {
      fontSize: 16,
      fontWeight: 600,
    },
  },

  placeholder: {
    fontSize: 12,
    color: '#9c9c9c',
    marginLeft: 48,
  },
  title: {
    marginLeft: 50,
  },
  checklistDay: {
    /* position: 'absolute',
    left: -47, */
  },
  checklists: {
    marginBottom: 8,
    // border: '1px solid rgba(164, 172, 186, 0.5)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  checklist: {
    paddingTop: 8,
    // transform: 'scale(0.7)',
  },
  tourIcon: {
    fontSize: 16,
    color: '#2cbe4e',
  },
};

export default styles;
