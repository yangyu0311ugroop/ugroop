const styles = theme => ({
  root: {},
  grow: {
    flex: '1',
  },
  filledEffect: {
    border: '1px solid #e2e2e1',
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#fff',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    marginBottom: 8,

    '&:hover': {
      backgroundColor: '#fff',
      boxShadow: 'rgb(131 192 253 / 50%) 0 0 0 2px',
      borderColor: '#0070c9',
    },
  },
  marginTop: {
    marginTop: '-5px',
    whiteSpace: 'nowrap',
  },
});

export default styles;
