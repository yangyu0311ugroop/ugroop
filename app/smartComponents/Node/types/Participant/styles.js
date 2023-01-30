const styles = theme => ({
  root: {},
  inviteContainer: {
    paddingRight: '0px !important',
    paddingTop: '0px !important',
    paddingBottom: '0px !important',
    marginTop: '-8px !important',
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
  inviteButton: {
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingTop: '4px',
    fontStyle: 'italic',
    fontSize: '12px',
  },
  iconContainer: {
    paddingRight: '0px !important',
    '& > button': {
      marginTop: '2px !important',
      marginBottom: '0px !important',
    },
    '&:hover': {
      cursor: 'pointer !important',
    },
  },
  showFormsContainer: {
    paddingLeft: '0px !important',
  },
  icon: {
    paddingTop: '10px !important',
  },
  pending: {
    borderColor: theme.colors.base,
    borderRadius: 2,
    fontSize: 11,
  },
  trail: {
    // width: 60,
    paddingRight: '0px !important',
  },
  itemName: {
    paddingBottom: 0,
  },
  invitBtn: {
    paddingRight: 4,
    minHeight: 0,
  },
  notConnected: {
    // color: '#e0bf00',
    // fontStyle: 'italic',
    fontSize: 12,
    margin: 0,
  },
  blankSpace: {
    width: 48,
  },
  pendingSeeDetail: {},
  personType: {
    paddingRight: 6,
  },
  tableCellPadding: {
    padding: 4,
    fontSize: 14,
  },
  cellContent: {
    fontWeight: 600,
    fontSize: 'inherit',
  },
  subPaddingLeft: {
    paddingLeft: '46px !important',
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },
  toolTipTitle: {
    whiteSpace: 'normal',
    textAlign: 'justify',
  },
  marginKnownAs: {
    marginLeft: 5,
    paddingTop: 2,
  },
});

export default styles;
