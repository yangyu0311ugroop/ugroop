const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    '& > h3': {
      margin: '16px 0',
      fontWeight: 600,
      color: '#2b344d',
      wordBreak: 'break-word',
    },
    '& > h5': {
      margin: 0,
      color: '#2b344d',
    },
  },
  hr: {
    borderTop: 'none',
    margin: '24px 0 0',
    backgroundColor: '#e3e9ef',
  },
  blueIcon: {
    fontSize: 40,
    color: '#86a6eb',
  },
  pinkIcon: {
    fontSize: 40,
    color: '#d75b7f',
  },
  greenIcon: {
    fontSize: 40,
    color: '#a1c99c',
  },
  grow: {
    flex: '1',
  },
  simplifyContent: {
    alignItems: 'unset',
  },
};

export default styles;
