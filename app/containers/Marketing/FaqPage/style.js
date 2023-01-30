const style = ({ colors }) => ({
  root: {
    padding: '80px 0 0',
    minHeight: '320px',
  },
  tabItems: {
    padding: '40px 0',
  },
  lowerBg: {
    height: '70vh',
  },
  lowerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
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
});

export default style;
