const stylesheet = {
  root: {},
  capitalize: {
    '& input': {
      textTransform: 'capitalize',
    },
  },
  error: {
    '& input': {},
  },
  attachmentTextField: {
    maxWidth: '100%',
  },
  valid: {
    '& input:after': {
      backgroundColor: '#7097EB',
      transform: 'scaleX(1)',
      height: 1,
    },
  },
  label: {},
};

export default stylesheet;
