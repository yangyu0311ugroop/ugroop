const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  smallText: {
    fontSize: 12,
    padding: '2px 8px',
    minHeight: 'unset',
    fontWeight: 500,
  },
  iconContainer: {
    position: 'relative',
    width: 100,
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    color: '#0a2644',
    padding: '4px 8px',
    background: 'unset',
    boxShadow: 'unset',
    minHeight: 'unset',

    '&:disabled': {
      color: '#9c9c9c',
    },
    '&:hover': {
      background: '#ebedf0',
    },
  },
  tableCellPadding: {
    padding: 4,
    fontSize: 14,
    whiteSpace: 'nowrap',
  },
  addBtnList: {
    fontSize: 10,
    padding: '8px 0px',
    minHeight: 'unset',
    fontWeight: 500,
  },
  deleteBtnAvatar: {
    position: 'absolute',
    padding: 0,
    top: '118px',
  },
  createButton: {
    marginBottom: -10,
    zIndex: 999,
  },
  menuItem: {
    padding: 0,
  },
  spacer: {
    paddingLeft: 4,
  },
  noWrapText: {
    whiteSpace: 'nowrap',
  },
  labelCard: {
    paddingBottom: 10,
  },
  subPaddingLeft: {
    paddingLeft: '46px !important',
  },
  deletBtn: {
    padding: '4px 0px',
  },
  textNoWrap: {
    whiteSpace: 'nowrap',
  },
  overrideCard: {
    padding: 0,
  },
  cardHeader: {
    paddingTop: 8,
    paddingLeft: 16,
    maxWidth: 280,
  },
  cardHeaderFull: {
    background: '#e3eaf0 !important',
  },
  editable: {
    // flex: 1,
    textAlign: 'center',
    color: '#607D8B',
    padding: '0px 4px',
    background: '#efefef',
    fontWeight: 500,
    borderRadius: '3px',
    minWidth: 50,
  },
  noPaddingTop: {
    paddingTop: '0px !important',
  },
  noPaddingRight: {
    paddingRight: '0px !important',
  },
  ageGroup: {
    color: '#8a8a8a',
    fontWeight: 500,
  },
  tourGrid: {
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '1px 1px 3px 0px #c5c5c5',
    borderRadius: 4,
    transition: '300ms cubic-bezier(.08,.52,.52,1) box-shadow',

    '& $starred': {
      visibility: 'hidden',
    },

    '&:hover $starred': {
      transition: 'transform 0.2s, visibility 0.4s',
      transform: 'translate3d(-8px, 0, 0)',
      visibility: 'visible',
    },
    // '&:hover': {
    //   boxShadow: '1px 1px 3px 2px #c5c5c5',
    // },
  },
  card: {
    minHeight: 190,
    background: 'white',
    borderRadius: 4,
    padding: '8px 16px',
  },
  /*  subtitle: {
    color: '#6d7688',
    fontSize: 11,

    // opacity: 0.7,
  }, */
  subtitle: {
    borderRadius: 0,
    minHeight: 40,
    background: '#bed5e4',
    margin: -16,
    marginBottom: 8,
  },
  center: {
    margin: '0 auto',
  },
  editingButton: {
    background: '#39bd3f !important',
    color: 'white !important',
    boxShadow: '0 1px 0 0 #008c06 !important',

    '&:hover': {
      backgroundColor: '#4CAF50',
    },
    '&:active': {
      backgroundColor: '#469849',
    },
  },
  actionButtons: {
    overflow: 'hidden',
    borderRadius: 2,
  },
  actionButton: {
    border: 'unset',
    minHeight: 'unset',
    color: '#0a2644',
    padding: '1px 12px',
    background: 'unset',
    boxShadow: 'unset',

    '&:hover': {
      background: '#ebedf0',
    },
  },
  actionButtonFull: {
    border: 'unset',
    minHeight: 'unset',
    color: '#0a2644',
    padding: '1px 12px',
    background: 'unset',
    boxShadow: 'unset',

    '&:hover': {
      background: '#b4d4e8',
    },
  },
};

export default styles;
