const stylesheet = {
  container: {
    position: 'relative',
  },
  xBtn: {
    position: 'absolute',
    right: 24,
    top: 16,
    margin: '0',
    padding: '0',
    height: '20px',
    width: '20px',
    minWidth: '16px',
    color: '#B0B9C3',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    zIndex: 3,
  },
  disabledBtn: {
    backgroundColor: '#EDF2F4',
    borderColor: '#EDF2F4',
  },
  headlineText: {
    '& h5': {
      textAlign: 'center',
    },
  },
  actionButtons: {
    '& button': {
      textTransform: 'none',
    },
  },
};

export default stylesheet;
