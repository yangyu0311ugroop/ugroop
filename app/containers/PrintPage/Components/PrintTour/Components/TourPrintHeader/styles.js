const styles = {
  root: {
    padding: '0 !important',
    marginBottom: 24,
    wordBreak: 'break-word',
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
    height: 280,
    position: 'relative',
  },
  image: {
    height: 280,
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
    fontSize: 38,
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
  description: {
    background: 'white',
    padding: 0,
    border: '1px solid transparent',
  },
};

export default styles;
