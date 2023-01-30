const style = {
  root: {},
  container: {
    paddingBottom: '40px',
  },
  featureContainer: {
    paddingTop: '80px',
    paddingBottom: '160px',
  },
  featureCard: {
    padding: '40px 72px',
    marginTop: '-80px',
    position: 'relative',
    zIndex: '99',
  },
  featureItem: {
    '&:nth-child(even)': {
      paddingLeft: '120px !important',
    },
    '&:nth-child(odd)': {
      paddingRight: '120px !important',
    },
    '& h4': {
      textTransform: 'uppercase',
    },
  },
  laptopBlock: {
    backgroundColor: 'white',
  },
  laptopImg: {
    width: '100%',
    height: 'auto',
    position: 'relative',
    zIndex: '999',
    marginTop: '-184px',
  },
  laptopBlockContainer: {
    textAlign: 'center',
    padding: '40px 16px',
  },
  paddingHeader: {
    paddingTop: '56px',
  },
};

export default style;
