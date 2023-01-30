import AvatarBG from 'shareAssets/avatarbg.png';

const styleSheet = {
  avatarImg: {
    zIndex: 1,
    alignSelf: 'center',
    '& img': {
      width: '60px',
      height: '60px',
      marginRight: 0,
      borderRadius: '50%',
      marginLeft: '6px',
    },
  },
  avatarLetter: {
    '& > span': {
      top: '15%',
      fontSize: '30px',
    },
    zIndex: 1,
    width: '60px',
    height: '60px',
    marginRight: 0,
    borderRadius: '50%',
    alignSelf: 'center',
    marginLeft: '6px',
  },
  avatarDropdown: {
    color: 'white',
    display: 'flex',
    position: 'relative',
    paddingTop: '5px',
    paddingBottom: '5px',
    backgroundImage: `url(${AvatarBG})`,
    backgroundPosition: 'center',
    '&:after': {
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      content: '" "',
      opacity: 0.9,
      position: 'absolute',
      // backgroundColor: '#7094ff',
      backgroundColor: '#FFA500',
    },
    '& > div:nth-child(2)': {
      zIndex: 1,
      marginLeft: '16px',
      '& > h4': {
        zIndex: 1,
        fontSize: '14px',
        fontWeight: 600,
        marginTop: '25px',
        marginBottom: '-10px',
      },
      '& > p': {
        fontSize: '12px',
      },
    },
  },
  listItemLinks: {
    display: 'flex',
    color: 'inherit',
    fontWeight: 600,
    fontSize: '14px',
    textDecoration: 'none',
    '& > i': {
      color: 'inherit',
      fontSize: '20px',
      paddingRight: '14px',
      marginLeft: '5px',
    },
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
  link: {
    textDecoration: 'none !important',
  },
  icon: {
    fontSize: 20,
    paddingLeft: 5,
    paddingRight: 14,
  },
  listItems: {
    fontSize: 14,
    fontWeight: 600,
    display: 'flex',
    color: '#ACB2C1',
    transition: '0.33s linear all',
    textDecoration: 'none !important',
    '&:hover': {
      color: '#2B344D',
      backgroundColor: '#FFF',
      transition: '0.11s linear all',
    },
  },
  listDivider: {
    width: '90%',
    height: '1.5px',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'rgba(154, 154, 154, 0.25)',
  },
  listSubheader: {
    display: 'flex',
  },
  profileName: {
    color: '#FFF',
    textTransform: 'capitalize',
  },
  subheaderImg: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
  },
  logoutLink: {
    width: '100%',
    color: '#ACB2C1',
    padding: 0,
    transition: '0.33s linear all',
    textDecoration: 'none !important',
    '&:hover, &:focus': {
      color: '#2B344D',
      backgroundColor: '#FFF',
      transition: '0.11s linear all',
    },
    '& > li > i': {
      marginLeft: '5px',
    },
  },
  closeButton: {
    position: 'absolute',
    padding: 0,
    marginTop: -16,
    top: 0,
    right: -15,
    zIndex: 1,
  },
  subHeaderKnownAsEllipsis: {
    float: 'left',
    width: '230px',
    marginRight: 10,
  },
};

export default styleSheet;
