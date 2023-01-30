const style = ({ colors }) => ({
  root: {
    paddingTop: '160px',
    paddingBottom: '160px',
  },
  normalFlex: {
    flex: '1 1 0',
  },
  rightItem: {
    alignSelf: 'center',
    textAlign: 'right',
  },
  marginZero: {
    margin: 0,
  },
  planItemCard: {
    padding: '8px 24px',
  },
  planItemCardContent: {
    height: '100%',
  },
  pricingText: {
    '& span': {
      fontWeight: '500',
      fontSize: '16px',
    },
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
