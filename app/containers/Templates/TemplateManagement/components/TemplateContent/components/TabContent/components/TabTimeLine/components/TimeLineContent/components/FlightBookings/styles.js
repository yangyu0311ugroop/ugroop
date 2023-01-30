const styles = {
  item: {
    outline: 'none',
  },
  itemBottom: {
    marginTop: 16,
  },
  root: {
    padding: 16,
    background: 'white',
    border: '1px solid rgb(209, 213, 221)',
    borderRadius: 4,
  },
  addButton: {
    color: 'rgba(76, 86, 115, 1)',
    '&:hover': {
      backgroundColor: '#ebedf0',
    },
  },
  header: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 600,
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

  button: {
    borderRadius: 0,

    '&:hover': {
      backgroundColor: '#e9f5ff',
    },
  },
  active: {
    background: '#e9f5ff',
    borderLeft: '2px solid #0077d6',
    transition: 'none',
  },
};

export default styles;
