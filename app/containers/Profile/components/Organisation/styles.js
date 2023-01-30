const styles = {
  root: {
    border: '0 solid #fff',
    width: '100%',
    padding: 16,
  },
  grow: {
    flex: '1',
  },
  tabContainer: {
    width: '100%',
  },
  loading: {
    fontSize: 14,
    fontWeight: 300,
    color: '#2b344d',
  },
  unauth: {
    fontSize: 24,
    fontWeight: 300,
    color: '#2b344d',
    margin: 24,
  },
  contentView: {
    maxWidth: 'unset',
    marginBottom: 80,
  },
  settingTab: {
    marginTop: 40,
  },
  tabHeader: {
    marginTop: 5,
  },
  contentMobileView: {
    marginTop: 10,
    marginBottom: 30,
  },
  link: {
    color: '#1a2b49',
    fontSize: 16,
    borderRadius: '0 50px 50px 0',
    padding: '10px 16px 10px 24px',
    display: 'block',

    '&:hover, &:active, &:focus': {
      textDecoration: 'none',
    },
    '&:hover': {
      background: 'rgba(0,0,0,0.039)',
      transition: 'background 15ms',
    },
  },
  activeLink: {
    color: '#1a73e8',
    background: '#e8f0fe',

    '&:hover, &:active, &:focus': {
      color: '#1a73e8',
      textDecoration: 'none',
    },
  },
  offsetGrid: {
    padding: 8,
    paddingBottom: 128,
  },
  left: {
    // minWidth: 210,
    width: 210,
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
