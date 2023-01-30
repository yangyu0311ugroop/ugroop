const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  invitationTitle: {
    marginTop: -4,
  },
  pm: {},
  decline: {
    color: '#7C7C7C',
    boxShadow: '0 0 1px 0 #7C7C7C',
  },
  buttons: {
    marginTop: -4,
    marginLeft: -4,
  },
  pendingButtons: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  tourRole: {
    fontWeight: 'bold',
  },
  declineConfirmBtn: {
    marginRight: 8,
    boxShadow: '0 1px 0 0 #8abd84',
  },
  viewTourBtn: {
    margin: 0,
    boxShadow: '0 1px 0 0 #8abd84',
  },
  viewTourLnk: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
  avatarGrid: {
    marginRight: 16,
  },
  optionTitle: {
    fontSize: 10,
    fontWeight: 600,
  },
  optionOrg: {
    padding: '0 4px 0',
  },
  shrinkGrid: {
    // transform: 'scale(.8)',
  },
  ellipsisDiv: {
    width: 236,
  },
  ellipsisClassName: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: 230,
    display: 'inherit',
  },
  iconArrow: {
    paddingLeft: 8,
  },
};

export default styles;
