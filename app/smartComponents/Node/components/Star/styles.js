const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  defaultStar: {
    borderRadius: '50%',
    background: 'unset',
    boxShadow: 'unset',
    color: '#ababab80',

    '&:hover': {
      color: '#ababab',
      background: '#f6f8fa40',
    },
  },
  defaultUnstar: {
    borderRadius: '50%',
    boxShadow: 'unset',
    background: 'unset',
    color: '#e0bf00',

    '&:hover': {
      background: '#f6f8fa40',
      color: '#e0bf0090',
    },
  },
};

export default styles;
