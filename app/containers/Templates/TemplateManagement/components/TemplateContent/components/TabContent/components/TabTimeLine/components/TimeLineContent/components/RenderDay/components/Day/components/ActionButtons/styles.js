const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  commentButton: {
    borderLeft: 'unset',
    boxShadow: 'unset',
    minHeight: 30,
    color: '#0a2644',
    padding: '2px 12px',
    background: 'unset',

    '&:hover': {
      background: '#ebedf0',
    },
  },
  actionButtons: {
    overflow: 'hidden',
    borderRadius: 2,
  },
  noBorder: {
    border: 'unset',
  },
  actionButton: {
    border: 'unset',
    minHeight: 'unset',
    color: '#0a2644',
    padding: '1px 12px',
    background: 'unset',
    boxShadow: 'unset',

    '&:hover': {
      background: '#ebedf0',
    },
  },
  borderLeft: {
    borderLeft: 'solid 1px #e3e9ef',
  },
  borderRight: {
    borderRight: 'solid 1px #e3e9ef',
  },
  addButton: {
    width: 32,
    height: 32,
    position: 'relative',
    color: '#bdc6ce',
    paddingTop: 3,
    paddingLeft: 8,

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
    lineHeight: '11px',
    paddingLeft: 1,

    position: 'absolute',
    bottom: 5,
    right: 5,

    '& i': {
      fontSize: 10,
    },
  },

  updateInfoMenu: {
    maxWidth: 190,
  },
  updateInfoMenuMobile: {
    maxWidth: 268,
  },
  headerMenu: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 600,
    color: '#9c9c9c',
    paddingLeft: 8,
  },
  separator: {
    borderTop: '1px solid gainsboro',
  },
  icon: {
    transition: 'transform 0.15s ease-in',
  },
  rotate45: {
    transform: 'rotate(45deg)',
    color: '#E91E63',
    fontWeight: 'bold',
  },

  editingButton: {
    background: '#39bd3f',
    color: 'white',
    boxShadow: '0 1px 0 0 #008c06',

    '&:hover': {
      backgroundColor: '#4CAF50',
    },
    '&:active': {
      backgroundColor: '#469849',
    },
  },
  wordbreak: {
    wordBreak: 'normal',
  },
};

export default styles;
