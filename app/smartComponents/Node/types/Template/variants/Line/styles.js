const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  defaultStar: {
    borderRadius: '50%',
    background: 'unset',
    boxShadow: 'unset',
    padding: '2px 4px',
    // minHeight: 32,
    color: '#ababab80',

    '&:hover': {
      color: '#ababab',
      background: '#f6f8fa',
      // background: 'unset',
    },
  },
  defaultUnstar: {
    borderRadius: '50%',
    boxShadow: 'unset',
    background: 'unset',
    padding: '2px 4px',
    color: '#e0bf00',

    '&:hover': {
      background: '#f6f8fa',
      // background: 'unset',
      color: '#e0bf0090',
    },
  },
  link: {
    padding: '0 2px',
  },
  defaultGrid: {
    '& $defaultStar': {
      visibility: 'hidden',
    },

    '&:hover $defaultStar': {
      visibility: 'visible',
    },
  },
};

export default styles;
