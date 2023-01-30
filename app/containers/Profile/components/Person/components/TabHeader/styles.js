const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  link: {
    borderRadius: 4,
    color: '#013c61',
    width: '100%',
    display: 'inline-block',
    padding: '4px 0 4px 4px',
    margin: '-2px 0',
    textDecoration: 'none',
    textAlign: 'left',
    '&:hover': {
      backgroundColor: '#e8e8e8',
      textDecoration: 'none',
    },
  },
  active: {
    borderRadius: 4,
    color: '#013c61',
    width: '100%',
    display: 'inline-block',
    padding: '4px 0 4px 4px',
    margin: '-2px 0',
    textDecoration: 'none',
    backgroundColor: '#e4f0f6',
    textAlign: 'left',
    fontWeight: '600',
    '&:hover': {
      backgroundColor: '#e4f0f6',
      textDecoration: 'none',
    },
  },
  personalHeaderTitle: {
    color: '#586069',
    fontWeight: 'bold',
    padding: '8px !important',
    backgroundColor: '#f3f5f8',
  },

  orgHeaderTitle: {
    marginTop: '20px',
    color: '#586069',
    fontWeight: 'bold',
    padding: '8px !important',
    backgroundColor: '#f3f5f8',
  },
};

export default styles;
