const styles = () => ({
  lineIndicator: {
    width: 40,
    height: 2,
    backgroundColor: '#8abd84',
  },
  name: {
    lineHeight: 1.6,
    marginTop: 8,
  },
  link: {
    color: '#337ab7',

    '&:hover': {
      color: '#23527c',
      textDecoration: 'underline',
      backgroundColor: 'white',
    },
  },
  active: {
    borderLeft: '2px solid #E66209',
    marginLeft: -16,
    paddingLeft: 14,
    fontWeight: 'bold',
  },
});

export default styles;
