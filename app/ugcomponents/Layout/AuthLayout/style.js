const stylesheet = {
  authentication: {
    overflowX: 'hidden',
  },
  sidebar: {
    position: 'relative',
  },
  logoXs: {
    textAlign: 'center',
  },
  sloganContainer: {
    fontWeight: 'bold',
  },
  bg: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    transition: 'all ease-in-out 200ms',
  },
  bgTinted: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(76, 86, 115, 0.5)',
  },
  text: {
    position: 'absolute',
    bottom: '20%',
  },
  logo: {
    position: 'absolute',
    top: 40,
    zIndex: 100,
  },
  content: {
    backgroundColor: 'white',
    paddingTop: '0px',
    overflowX: 'hidden',
  },
  contentContainer: {
    marginLeft: '0',
    backgroundColor: 'white',
    '& > div:first-child': {
      paddingRight: 24,
      paddingTop: 80,
    },
    '& > div:last-child': {
      display: 'flex',
      flexDirection: 'column-reverse',
      paddingBottom: 80,
      '& > h5': {
        borderTop: 'solid 1px #EDF2F4',
        paddingTop: 16,
      },
    },
  },
  header: {
    marginTop: 0,
    marginBottom: 24,
    fontWeight: 300,
    color: '#2B344D',
  },
  gridItem: {
    transition: 'max-width ease 200ms',
    display: 'flex',
  },
};

export default stylesheet;
