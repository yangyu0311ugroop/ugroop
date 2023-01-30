const styles = theme => ({
  grow: {
    flex: '1',
  },
  item: {
    background: 'white',
    borderBottom: 'none',
    cursor: 'pointer',
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: '24px',
  },
  emailContainer: {
    whiteSpace: 'nowrap',
    width: '202px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  email: {
    paddingTop: 2,
    paddingBottom: 2,
  },
  added: {
    paddingBottom: 2,
  },
  pending: {
    color: '#e0bf00',
    fontStyle: 'italic',
    fontSize: 12,
    margin: 0,
    '&:hover, &:active, &:focus': {
      textDecoration: 'underline',
    },
  },
  trail: {
    width: 60,
  },
  invitBtn: {
    borderColor: theme.colors.base,
    borderRadius: 2,
    fontSize: 11,
  },
  notConnected: {
    // color: '#e0bf00',
    // fontStyle: 'italic',
    fontSize: 12,
    margin: 0,
  },
});

export default styles;
