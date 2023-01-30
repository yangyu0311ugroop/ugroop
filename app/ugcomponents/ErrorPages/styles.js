const styles = {
  root: {
    top: 0,
    left: 0,
    minWidth: '100%',
    minHeight: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1f273d',
    position: 'absolute',
    zIndex: -1,
  },
  container: {
    color: '#fff',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    margin: 0,
    padding: 0,
    lineHeight: 1.57,
    letterSpacing: 10,
    color: '#fff',
  },
  code: {
    color: '#668ee5',
    fontSize: 288,
    fontWeight: 900,
    paddingRight: 52,
    fontStyle: 'italic',
    lineHeight: 'normal',
  },
  message: {
    fontWeight: 600,
    color: '#fff',
  },
  button: {
    margin: 0,
    color: '#fff',
    border: 'none',
    padding: '16px 32px',
    backgroundColor: '#a1c99c',
    '&:hover': {
      backgroundColor: '#b0dcb8',
    },
  },
  grow: {
    flex: '1',
  },
};

export default styles;
