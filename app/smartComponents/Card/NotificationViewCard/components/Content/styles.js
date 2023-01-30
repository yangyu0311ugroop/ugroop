const styles = theme => ({
  root: {
    padding: '4px 16px',
    '&:hover, &:focus': {
      backgroundColor: '#f6f8fa',
    },
  },
  grow: {
    flex: '1',
  },
  spacing: {
    paddingTop: 4,
  },
  iconPadding: {
    paddingRight: 16,
  },
  nowrap: {
    flexWrap: 'nowrap',
    display: 'flex',
    whiteSpace: 'nowrap',
  },
  empty: {
    textAlign: 'center',
    margin: '0 32px',
  },
  contentHeight: {
    height: 32,
  },
  item: {
    padding: '8px 0',
  },
  invitationTitle: {
    paddingLeft: 16,
    wordBreak: 'break-word',
  },
  readBtn: {
    width: 24,
    height: 24,
    '& svg': {
      width: 16,
      height: 16,
    },
  },
  iconClass: {
    fontSize: 10,
    height: 12,
    width: 12,
    lineHeight: 1.3,
    borderRadius: '50%',
    backgroundColor: '#7097EB',
  },
  bold: {
    fontWeight: 600,
  },

  simple: {
    fontWeight: 'normal',
    lineHeight: '1.4',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px !important',
    },
  },
});

export default styles;
