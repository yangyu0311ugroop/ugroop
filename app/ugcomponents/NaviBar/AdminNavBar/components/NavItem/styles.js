const styles = {
  root: {},
  grow: {
    flex: '1',
  },

  button: {
    padding: '6px 8px',
    cursor: 'pointer',
    borderRadius: 4,
    position: 'relative',

    transition: '200ms cubic-bezier(.08,.52,.52,1) background',

    '&:hover': {
      background: 'whitesmoke',
    },
  },

  buttonInactive: {
    color: '#1a2b49',

    '&:hover': {
      background: '#efefef60',
    },
  },

  active: {
    color: '#1a2b49',

    '&:hover': {
      color: '#1a2b49',
    },

    '&:hover $badge': {
      color: 'white',
    },
  },

  badge: {
    position: 'absolute',
    top: 3,
    right: 0,
    backgroundColor: '#4CAF50',
    borderRadius: 2,
    fontSize: 10,
    padding: '1px 3px',
    lineHeight: 1.1,
    '-webkit-font-smoothing': 'subpixel-antialiased',
    pointerEvents: 'none',
    color: 'white',
  },

  topIndex: {
    zIndex: 1600,
  },
};

export default styles;
