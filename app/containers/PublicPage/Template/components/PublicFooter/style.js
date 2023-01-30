const style = {
  root: {
    backgroundColor: '#2b344d',
    position: 'relative',
    padding: '18px 0',
    display: 'flex',
  },
  grow: {
    flex: 1,
  },
  footerContent: {
    position: 'relative',
    zIndex: 99,
    flex: '1 1 0',
    display: 'flex',
  },
  footerBottom: {
    '& footer': {
      width: '100%',
    },
    '& li': {
      color: 'white',
    },
    '& a': {
      color: 'white',
    },
  },
  footerClass: {
    paddingTop: 4,
    marginBottom: 0,
  },
  container: {
    width: '100%',
    padding: '0 5%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  avatar: {
    display: 'flex',
    alignItems: 'center',
    '& h6': {
      margin: '2px 0',
      color: '#fff',
      letterSpacing: 1,
    },
  },
  imgCircle: {
    width: 40,
    height: 40,
    marginRight: 16,
    borderRadius: '50%',
  },
  nameStyle: {
    color: '#7097eb',
    textTransform: 'capitalize',
  },
  sharedBy: {
    position: 'absolute',
    bottom: -12,
    left: '5%',
  },
};

export default style;
