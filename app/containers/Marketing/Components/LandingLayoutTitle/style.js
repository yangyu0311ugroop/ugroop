const style = ({ colors }) => ({
  homeContainer: {
    marginTop: '80px',
    display: 'flex',
    height: '70vh',
    alignItems: 'center',
  },
  faqInputStyle: {
    width: '70%',
  },
  homeHeader: {
    fontSize: '3em',
  },
  homeBtn: {
    backgroundColor: colors.red,
    padding: '16px 72px',
    borderBottom: `2px solid ${colors.lightRed}`,
    color: '#fff',
    '&:hover': {
      backgroundColor: colors.red,
    },
    textTransform: 'uppercase',
  },
  featureContainer: {
    marginTop: '160px',
    display: 'flex',
  },
  container: {
    width: '600px',
  },
  hrStyle: {
    border: '0px solid transparent',
    position: 'relative',
    '&:after': {
      content: '""',
      borderBottom: `1px solid ${colors.mercury}`,
      position: 'absolute',
      width: '9%',
      top: '-50px',
    },
  },
  centeredContainer: {
    textAlign: 'center',
    width: '100%',
  },
});

export default style;
