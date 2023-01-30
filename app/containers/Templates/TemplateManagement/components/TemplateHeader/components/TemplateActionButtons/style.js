const stylesheet = () => ({
  root: {
    position: 'relative',
    textAlign: 'right',
    zIndex: '99',
    '& > button:first-child': {
      marginLeft: 0,
    },
  },
  grow: {
    flex: 1,
  },

  iconBorder: {
    borderRight: '1px solid #ebedf0',
  },
  iconClassName: {
    paddingRight: 0,
  },
  manageTabsTab: {
    color: '4c5673',
    background: 'white',
    boxShadow: 'unset',
    // borderLeft: '1px solid #dbdee4',
    minHeight: 30,
    padding: '2px 4px 2px 4px',
    paddingTop: 2,
    borderRadius: 'unset',
    fontSize: 12,
    wordBreak: 'keep-all',

    '&:hover': {
      background: '#ebedf0',
    },
  },

  popper: {
    marginTop: 1,
    borderRadius: 2,
  },
  actionButton: {
    background: 'whitesmoke',
    boxShadow: 'unset',
    // borderLeft: '1px solid #dbdee4',
    color: '#4c5673',
    minHeight: 33,
    padding: '4px 12px',
    borderRadius: 'unset',
    wordBreak: 'keep-all',

    '&:hover': {
      background: '#ebedf0',
    },
  },
  menuButton: {
    color: '#4c5673',
    textAlign: 'left',
    padding: 4,
  },
  menuButtonHover: {
    '&:hover': {
      background: '#ebedf0',
    },
  },
  marginLeft: {
    marginLeft: 4,
  },
  moreMenu: {
    padding: 16,
    minWidth: 165,
    maxWidth: 260,
  },
  actionButtons: {
    overflow: 'hidden',
  },
  actionButtons2: {
    overflow: 'hidden',
    borderRadius: 2,
    alignItems: 'baseline',
  },
  buttonsUpdating: {
    background: '#39bd3f',
    color: 'white',
    border: 'none',

    '&:hover': {
      background: '#39bd3f',
    },
  },
  noBorderLeft: {
    borderLeft: 'none',
  },
  unresolvedBadge: {
    background: '#fa3e3e',
    color: 'white',
    padding: '1px 3px',
    borderRadius: 2,
    fontSize: 10,
  },
  offsetTop: {
    marginTop: -4,
  },
  discussionBadge: {
    marginLeft: 4,
    marginTop: -6,
  },

  menuItemHeader: {
    backgroundColor: '#fbfcfd',
    cursor: 'unset',

    '&:hover': {
      backgroundColor: '#fbfcfd',
    },
  },
  menuItemText: {
    paddingLeft: 12,
    minWidth: 120,
  },
  menuHeader: {
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },
  btns: {
    marginTop: '0',
    marginRight: '8px',
    '&:last-child': {
      marginRight: '0',
      transition: 'linear 150ms',
    },
  },
  btnsSticky: {
    marginTop: '0',
    marginRight: '8px',
    '&:last-child': {
      marginRight: '0',
      transition: 'linear 150ms',
    },
    backgroundColor: 'white',
    border: 'solid 1px #e3e9ef',
  },
  btnIcon: {
    color: 'white !important',
  },
  btnIconSticky: {
    color: '#babfcd !important',
  },
  moreOptionBtnIconHovered: {
    color: 'black !important',
  },
  moreOptionBtn: {
    backgroundColor: 'red',
    borderRadius: '50% 50% 0 0',
    position: 'relative',
    transition: 'linear 150ms',
  },
  moreOptionBtnContainer: {
    display: 'inline-block',
  },
  moreOptionBtnIcon: {
    color: 'rgb(172,178,193) !important',
    margin: 0,
  },
  moreOptionSubBtn: {
    backgroundColor: 'white',
    border: '1px solid rgb(229,234,241)',
    margin: '0 4px',
  },
  optionsContainer: {
    padding: '8px',
    position: 'absolute',
    backgroundColor: 'white',
    bottom: '-57px',
    right: '0px',
    display: 'flex',
    width: '310px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px 0px 8px 8px',
    border: '1px solid rgb(229,234,241)',
  },
  onClickedMoreOptions: {
    margin: '0',
    paddingBottom: '42px',
    paddingTop: '12px',
    backgroundColor: 'white',
    border: '1px solid rgb(229,234,241)',
    borderBottom: '1px solid white',
    zIndex: '999',
    '& i': {
      color: 'black',
    },
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  badge: {
    width: 6,
    height: 8,
    minWidth: 6,
    margin: '0px -2px',
    right: -8,
    top: -1,
  },
  badgeMenu: {
    margin: '6px 10px',
  },
  headlineText: {
    '& h5': {
      textAlign: 'center',
    },
  },
  tourPrintlink: {
    color: '#4c5673',
    textDecoration: 'none',
    '&:hover': {
      color: '#4c5673',
      textDecoration: 'none',
    },
  },
  option: {
    display: 'flex',
  },
  optionText: {
    paddingTop: 6,
  },
  checkBoxRoot: {
    height: 24,
    width: 30,
    color: 'blue',
  },
  checkBox: {
    color: '#acb2c1',
  },
  checkLabel: {
    color: '#76809a',
    fontSize: 14,
  },
  formLabel: {
    marginBottom: 0,
    padding: '4px 0 0 6px',
  },

  menuIcon: {
    color: '#4c5673',
    fontWeight: 500,
  },
  menuHeading: {
    fontWeight: 500,
  },
  menuSubtitle: {
    fontWeight: 300,
  },
  hr: {
    marginTop: 4,
    marginBottom: 4,
  },
  displayBlock: {
    display: 'flex',
    width: '100%',
  },
  cardRoot: {
    // minWidth: 375,
    padding: 32,
  },

  modePopper: {
    // borderLeft: '1px solid #f1f1f1',
    // '&:hover': {
    //   borderLeft: '1px solid #dbdee4',
    // },
  },
  checked: {
    color: 'black !important',
  },
  defaultStar: {
    borderRadius: '50%',
    background: 'unset',
    boxShadow: 'unset',
    color: '#ababab80',

    '&:hover': {
      color: '#ababab',
      background: '#f6f8fa40',
    },
  },
  defaultUnstar: {
    borderRadius: '50%',
    boxShadow: 'unset',
    background: 'unset',
    color: '#e0bf00',

    '&:hover': {
      background: '#f6f8fa40',
      color: '#e0bf0090',
    },
  },
});

export default stylesheet;
