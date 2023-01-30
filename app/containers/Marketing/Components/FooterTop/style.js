export default {
  logo: {
    height: 'auto',
    width: '100px',
  },
  root: {
    display: 'flex',
    height: '80%',
    alignItems: 'center',
  },
  rowItems: {
    marginLeft: '160px',
    marginRight: '80px',
    display: 'flex',
    flexDirection: 'column',
    '& a:first-child': {
      marginBottom: '10px',
      color: 'white',
      fontWeight: '700',
    },
    '& a:hover': {
      color: 'white',
    },
  },
};
