const styles = {
  container: {
    height: '100%',
    minHeight: '100vh',
    backgroundColor: '#f6f8fa',
  },
  grow: {
    flex: 1,
  },
  footer: {
    padding: 20,
    backgroundColor: '#2b344d',
  },
  content: {
    paddingBottom: 250,
    paddingTop: 24,
    paddingLeft: 24,
    paddingRight: 24,
    // fix for react-slick deep css behavior
    '@media (max-width: 630px)': {
      paddingBottom: 72,
    },
    '@media (max-width: 570px)': {
      paddingBottom: 120,
    },
  },
};

export default styles;
