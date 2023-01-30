const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  compact: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  menuButton: {
    textAlign: 'left',
    cursor: 'unset',
    borderRadius: 'unset',
    fontWeight: 300,
    padding: '4px 16px',
  },
  menuButtonHover: {
    cursor: 'pointer',
    transition: '400ms cubic-bezier(.08,.52,.52,1) background-color',

    '&:hover': {
      background: '#dff4ff',
    },
  },
  button: {
    background: '#f7f7f7',
    borderBottom: '1px solid rgb(209, 213, 221)',
  },

  // color
  default: {
    color: '#0a2644',
  },
  danger: {
    color: '#ff3b2f',
  },

  selected: {
    color: '#0146da',

    '& i': {
      color: '#0146da',
    },
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },
};

export default styles;
