/**
 * Created by edil on 9/26/17.
 */
const styleSheet = {
  blockUI: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    minHeight: '100vh',
  },
  container: {
    margin: 0,
    color: '#989494',
    backgroundColor: '#fff',
    borderRadius: '2px',
    padding: '5%',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
  },
  navigations: {
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    '& > a': {
      textDecoration: 'none',
    },
  },
  proceed: {
    marginTop: '30px',
    '& > button': {
      fontWeight: 600,
    },
  },
  proceedButton: {
    display: 'flex',
  },
  submitButton: {
    '& > button': {
      color: 'white',
      margin: '16px 0px',
      fontWeight: '600',
      borderRadius: '2px',
      padding: '12px 24px !important',
      transition: 'linear 300ms',
      display: 'inline-block',
      textTransform: 'none',
      background: '#86B999',
      boxShadow: {
        x: 0,
        y: 1,
        blur: null,
        spread: null,
        color: '#6BA380',
      },
      '&:hover, &.focus': {
        background: '#6BA380',
        transition: 'ease-out 1ms',
      },
      '&:disabled': {
        background: '#5c8c6e',
        cursor: 'not-allowed',
        color: '#c1c1c1',
      },
      '& > span[class="ladda-spinner"]': {
        top: '1px',
        right: '0 !important',
      },
    },
  },
  personButton: {
    padding: '16px 44px',
  },
  logout: {
    marginTop: '-28px',
    '& > button': {
      fontWeight: 600,
      color: '#989494',
    },
    '& > button:hover, button:focus': {
      backgroundColor: 'rgba(255, 181, 54, 0.5)',
    },
  },
  backButton: {
    height: '54px',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none !important',
    '& > button': {
      fontWeight: 600,
      color: '#989494',
    },
  },
  logoutButton: {
    padding: '16px 108px',
  },
  welcome: {
    color: '#759bec',
    margin: '20px 0',
    fontSize: 30,
  },
  iconChevron: {
    display: 'flex',
    paddingLeft: '5px',
  },
  iconWaving: {
    color: '#c0d5e0',
  },
  h4Style: {
    lineHeight: 1.5,
    textAlign: 'justify',
  },
  orgPersonLogout: {
    marginTop: '-10px',
    extend: 'logout',
  },
  orgPersonNavigations: {
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& > button': {
      fontWeight: 600,
    },
  },
  // Organisation Setup
  formControl: {
    margin: '3px',
    width: '100%',
    height: 'unset',
  },
  group: {
    margin: 0,
  },
  capital: {
    fontWeight: 600,
    textTransform: 'capitalize',
  },
  profilePic: {
    fontWeight: 600,
    textAlign: 'center',
  },
  selection: {
    '& > div > div': {
      paddingRight: 0,
      backgroundColor: 'white',
      borderBottom: '1px solid #ccc',
    },
  },
  menuItem: {
    width: '100%',
  },

  // Person Setup
  personContainer: {
    padding: '5%',
  },
  headers: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& > h4': {
      fontWeight: 600,
    },
  },
  profilePicGrid: {
    width: 'inherit',
    display: 'flex',
    justifyContent: 'center',
  },
  genderPhoneGrid: {
    width: 'inherit',
  },
  iconCaret: {
    color: '#c0d5e0',
  },
  receiveAlerts: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '-14px',
  },
  radioGroup: {
    display: 'block',
  },
  radioButton: {
    '& > span:nth-child(2) > span': {
      fontSize: '17px',
      lineHeight: 1.6,
      fontWeight: 300,
      margin: 0,
      color: '#4C5673',
      fontFamily: 'IBM Plex Sans, sans-serif',
    },
  },
  checkbox: {
    color: '#7097EB !important',
  },
  radioClass: {
    color: '#7097EB !important',
  },
  infoButton: {
    padding: 0,
    margin: 0,
    minWidth: 0,
  },
};

export default styleSheet;
