const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  left: {
    minWidth: 210,
  },
  link: {
    color: '#1a2b49',
    fontSize: 16,
    borderRadius: '0 50px 50px 0',
    padding: '10px 16px 10px 24px',
    display: 'block',

    '&:hover, &:active, &:focus': {
      textDecoration: 'none',
    },
    '&:hover': {
      background: 'rgba(0,0,0,0.039)',
      transition: 'background 15ms',
    },
  },
  offsetGrid: {
    padding: 8,
    paddingBottom: 128,
  },
  activeLink: {
    color: '#1a73e8',
    background: '#e8f0fe',

    '&:hover, &:active, &:focus': {
      color: '#1a73e8',
      textDecoration: 'none',
    },
  },
};

export default styles;
