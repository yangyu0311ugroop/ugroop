/**
 * Created by edil on 9/26/17.
 */
import BG1 from 'shareAssets/bg-first-time-setup-1.jpg';
import BG2 from 'shareAssets/bg-first-time-setup-2.jpg';
import BG3 from 'shareAssets/bg-first-time-setup-3.jpg';

const styleSheet = {
  parent: {
    zIndex: 0,
    width: '100%',
    minHeight: '100vh',
    margin: '0 auto',
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: '#edf2f4',
    '&:before': {
      top: 0,
      zIndex: -1,
      width: '100%',
      height: '400px',
      content: '" "',
      position: 'absolute',
      backgroundImage:
        'linear-gradient(to bottom, rgba(237, 242, 244, 0.5), #edf2f4 100%)',
    },
    '&:after': {
      zIndex: -2,
      width: '100%',
      height: '400px',
      content: '" "',
      position: 'absolute',
    },
  },
  logoutContainer: {
    display: 'flex',
  },
  welcomePage: {
    '&:after': {
      background: `url(${BG1}) center center no-repeat`,
      backgroundSize: 'cover',
    },
  },
  orgSetup: {
    '&:after': {
      background: `url(${BG2}) center center no-repeat`,
      backgroundSize: 'cover',
    },
  },
  personSetup: {
    '&:after': {
      background: `url(${BG3}) center center no-repeat`,
      backgroundSize: 'cover',
    },
  },
  container: {
    width: '100%',
    height: '100%',
    minHeight: '100vh',
  },
  logo: {
    display: 'flex',
    width: 'inherit',
    marginTop: '40px',
    padding: '0 !important',
    '& > div': {
      display: 'flex',
      width: 'inherit',
      justifyContent: 'space-between',
      '& > a': {
        textDecoration: 'none',
        '& > button': {
          margin: 0,
          display: 'flex',
          '& > span > i': {
            paddingRight: '4px',
          },
        },
      },
    },
  },
  content: {
    width: 'inherit',
    marginTop: 16,
    marginBottom: 8,
  },
  noSpacing: {
    margin: 0,
    padding: 0,
  },
  footer: {
    width: 'inherit',
    borderTop: '1px solid #DFE8EC',
  },
  copyright: {
    fontSize: '12px',
    color: '#76809A',
    fontFamily: 'IBM Plex Sans, sans-serif',
  },
  footerLink: {
    extend: 'copyright',
    marginRight: '15px',
    textDecoration: 'none',
    '&:hover, &:focus, &:active': {
      color: '#37415B',
      textDecoration: 'none',
    },
  },
  logoutHidden: {
    visibility: 'hidden',
  },
};

export default styleSheet;
