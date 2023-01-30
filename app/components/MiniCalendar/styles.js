const styles = {
  root: {},
  grow: {
    flex: '1',
  },

  table: {
    borderCollapse: 'collapse',
  },
  cell: {
    border: '1px solid #e4e7e7',
    width: 39,
    height: 38,
    textAlign: 'center',
    background: 'white',
    transition: '200ms cubic-bezier(.08,.52,.52,1) background',

    '&:hover': {
      background: '#f4faff',
    },
  },
  emptyCell: {
    background: 'unset',
    cursor: 'unset',
    border: 'unset',

    '&:hover': {
      background: 'unset',
    },
  },
  weekHeader: {
    color: '#757575',
    fontSize: 12,
    textAlign: 'center',
  },
  month: {
    textAlign: 'center',
    paddingBottom: 12,
    fontWeight: 500,
  },
  dayContent: {
    fontSize: 12,
    cursor: 'pointer',
  },
  today: {
    fontWeight: 500,
    background: '#F44336',
    color: 'white',
    borderRadius: '50%',
    width: 18,
    height: 18,
    margin: '0 auto',
  },

  cellActive: {
    background: '#e9f5ff',
  },
};

export default styles;
