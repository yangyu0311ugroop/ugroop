const style = ({ colors }) => ({
  mildIcon: {
    color: colors.mild,
  },
  moderateIcon: {
    color: colors.moderate,
  },
  severeIcon: {
    color: colors.severe,
  },
  cross: {
    color: '#bf1750',
    position: 'absolute',
    zIndex: 9,
    top: 4,
    fontSize: 14,
    left: 1,
    fontWeight: 'bolder',
  },
  gridIcon: {
    position: 'relative',
  },
});

export default style;
