const styles = {
  item: {
    marginTop: 8,
    marginBottom: 8,
    outline: 'none',
  },
  itemBottom: {
    marginTop: 16,
  },
  root: {
    padding: 16,
    border: '1px solid rgb(209, 213, 221)',
    background: 'white',
    borderRadius: 4,
  },
  btns: {
    border: '1px solid #E3E9EF',
    borderRadius: 4,
  },
  header: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 500,
    color: '#9c9c9c',
    border: 'unset',
  },
  noContent: {
    color: '#9c9c9c',
    fontStyle: 'italic',
    fontSize: 12,
  },
  smallText: {
    fontSize: 12,
    padding: '2px 8px',
    minHeight: 'unset',
    fontWeight: 500,
  },

  pinButton: {
    background: 'unset',
    boxShadow: 'unset',
    color: 'gray',
    borderRadius: '50%',

    '&:hover': {
      backgroundColor: '#fafbfc',
    },
  },
  sticky: {
    transform: 'rotate(-45deg)',
  },
};

export default styles;
