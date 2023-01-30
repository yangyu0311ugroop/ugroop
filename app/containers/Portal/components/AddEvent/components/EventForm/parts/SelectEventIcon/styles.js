const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  popper: {
    maxWidth: 396,
  },

  eventIcon: {
    minWidth: 70,
    height: 54,
    background: 'white',
    borderRadius: 4,
    border: '1px solid #e2e2e1',
    transition:
      'border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

    '&:hover': {
      background: 'white',
      boxShadow: `rgba(131,192,253,.5) 0 0 0 2px`,
      borderColor: '#0070c9',
    },
  },

  iconButtonSm: {
    border: '2px solid transparent',
  },

  iconButtonSmActive: {
    border: '2px solid #0070c9',

    '&:active, &:focus': {
      boxShadow: `rgba(131,192,253,.5) 0 0 0 2px`,
    },
  },
};

export default styles;
