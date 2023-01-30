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
  headerTitle: {
    color: '#586069',
    fontWeight: 'bold',
    padding: '8px !important',
    backgroundColor: '#f3f5f8',
  },
  headerOrgTitle: {
    padding: '0 0 8px 0 !important',
  },
  orgName: {
    color: '#586069',
    fontWeight: 'bold',
    // backgroundColor: '#f3f5f8',
  },
  orgHeaderTitle: {
    marginTop: '20px',
    color: '#586069',
    fontWeight: 'bold',
    padding: '8px !important',
    backgroundColor: '#f3f5f8',
  },
  photoBackground: {
    background: '#9e9e9e45',
    borderRadius: 4,
    minHeight: 24,
  },
  photo: {
    minWidth: 24,
    minHeight: 24,
    marginRight: 8,
  },
  button: {
    color: '#0366d6',
    position: 'relative',
    top: '-2px',
  },
  showMore: {
    paddingTop: 8,
  },
  menuButton: {
    borderRadius: 0,
    border: 0,
    marginLeft: 10,
  },
  orgCount: {
    color: '#586069',
    backgroundColor: '#f6f8fa',
    fontSize: 14,
  },
};

export default styles;
