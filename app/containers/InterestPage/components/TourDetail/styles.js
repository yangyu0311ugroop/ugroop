const styles = {
  root: {
    maxWidth: 540,
    marginRight: 16,
  },
  grow: {
    flex: '1',
    maxWidth: '100%',
  },
  topHeader: {
    width: '88%',
    margin: '0 auto',
  },
  topHeaderContent: {
    alignItems: 'center',
  },
  imageContainer: {
    height: 215,
    position: 'relative',
  },
  nameContainer: {
    '& > p': {
      marginBottom: 0,
      fontWeight: 600,
      textTransform: 'capitalize',
      lineHeight: 1.2,
    },
    '& > p:last-child': {
      color: '#acb2c2',
    },
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
  },
  ugTemplateListTitle: {
    color: '#202840',
    fontWeight: 600,
    // padding: 0,
    padding: '24px 0 0',
    flex: 1,
  },

  ugTemplateDescription: {
    lineHeight: '150%',
    paddingTop: 8,
    textAlign: 'justify',
    color: '#4c5673',
    margin: 0,
    position: 'relative',
  },
  logo: {
    height: 'auto',
    width: 40,
  },
  label: {
    fontSize: 17,
    color: '#c6ccd6',
    paddingRight: 8,
    fontWeight: 600,
  },
  field: {
    fontSize: 17,
    color: '#495873',
    paddingRight: 8,
    fontWeight: 600,
  },
  col1: {
    flexBasis: '12%',
    maxWidth: '12%',
  },
  templateDetail: {
    padding: 0,
    margin: 0,
  },
  itinerary: {},
  carousel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  button: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: 24,
  },
};

export default styles;
