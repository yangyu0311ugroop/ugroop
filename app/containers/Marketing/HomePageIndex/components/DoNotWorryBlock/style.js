const style = ({ colors }) => ({
  header: {
    fontSize: '120px',
    marginTop: '0',
    marginBottom: '0',
  },
  firstContainer: {
    textAlign: 'center',
    marginTop: '80px',
  },
  marginBottomZero: {
    marginBottom: '0',
    '&:last-child': {
      marginTop: '0',
    },
  },
  headingPart: {
    padding: '40px 0',
  },
  cardContent: {
    padding: '40px',
    height: 'auto',
  },
  cardOverride: {
    marginTop: '80px',
    marginBottom: '-80px',
  },
  itemDescription: {
    padding: '25px 35px 0 0',
  },
  item: {
    padding: '15px 80px !important',
  },
  itemHeaderContainer: {
    position: 'relative',
    '& svg': {
      position: 'absolute',
      right: '10%',
      top: '0',
      transform: 'scale(2, 2)',
      color: colors.gray,
    },
  },
  marginAuto: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default style;
