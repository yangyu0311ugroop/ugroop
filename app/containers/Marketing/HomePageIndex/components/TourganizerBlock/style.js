const style = ({ colors }) => ({
  root: {
    paddingBottom: '120px',
  },
  header: {
    fontSize: '120px',
    marginTop: '0',
    marginBottom: '0',
  },
  secondHeader: {
    marginTop: '0',
  },
  underlineWord: {
    borderBottom: `1px solid ${colors.orange}`,
    padding: '18px 0',
  },
  noMarginTopBottom: {
    marginTop: '0',
    marginBottom: '0',
  },
  tourList: {
    paddingTop: '50px',
  },
  tourDescItems: {
    padding: '0 40px !important',
    position: 'relative',
  },
  iconStyle: {
    position: 'absolute',
    top: '0',
    left: '0px',
    color: colors.crail,
    transform: 'scale(1.95, 1.95)',
  },
});

export default style;
