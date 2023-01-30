const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  inviteContainer: {
    paddingRight: '0px !important',
  },
  inviteButton: {
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingTop: '4px',
    fontStyle: 'italic',
    fontSize: '12px',
  },
  actionButton: {
    border: 'unset',
    color: 'unset',
    minHeight: 'unset',
    padding: '2px 4px',
    background: 'unset',
    boxShadow: 'unset',

    '&:hover': {
      background: '#c5c5c54f',
    },
  },
  darkButton: {
    color: 'white',
  },
  popper: {
    marginTop: 4,
    zIndex: 9999,
    fontWeight: 400,
    width: 300,
  },
  popperContainer: {
    padding: 16,
    width: 300,
  },
  emailEllipsis: {
    maxWidth: 190,
    float: 'left',
  },
  noUnderline: {
    borderBottom: 'none !important',
    cursor: 'inherit !important',
    textDecoration: 'none !important',
  },
  icon: {
    marginRight: 10,
    /* fontSize: 20,
    lineHeight: '.9', */
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },
};

export default styles;
