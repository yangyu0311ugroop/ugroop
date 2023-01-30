const styles = {
  root: {},
  grow: {
    flex: '1',
  },

  level: {
    fontSize: 10,
    boxShadow: '0 1px 0 0 gainsboro',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    minWidth: 26,
    textAlign: 'center',
    minHeight: 'unset',
    padding: '2px 8px',
  },

  level0: {
    background: '#39bd3f',
    color: 'white',
  },
  level1: {
    background: '#3c88fe',
    color: 'white',

    '&:hover': {
      background: '#3c88fe',
    },
  },
  level2: {
    background: '#ffe500',
    color: '#7b7b7b',

    '&:hover': {
      background: '#ffe500',
    },
  },
  level3: {
    background: '#ff9700',
    color: 'white',

    '&:hover': {
      background: '#ff9700',
    },
  },
  level4: {
    background: '#ea5131',
    color: 'white',

    '&:hover': {
      background: '#ea5131',
    },
  },
  level5: {
    background: 'black',
    color: 'white',

    '&:hover': {
      background: 'black',
    },
  },

  fade: {
    opacity: 0.4,
  },
};

export default styles;
