const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  ugCardItemTitle: {
    fontWeight: 600,
    color: '#495873',
    margin: '0 0 8px 0',
  },
  templateContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 24px',
    height: 217,
    '&:before, &:after': {
      display: 'none',
    },
    '&:hover > a': {
      textDecoration: 'none',
    },
  },
  templateItemBodyContainer: {
    overflow: 'hidden',
    flex: 1,
    color: '#495873',
    marginBottom: 8,
  },
  ugcardLink: {
    color: 'inherit',
    textDecoration: 'none',
  },
  startDateContainer: {
    paddingBottom: 8,
  },
  startDate: {
    fontSize: 11,
  },
};

export default styles;
