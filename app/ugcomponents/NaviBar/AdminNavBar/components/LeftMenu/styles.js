import { isIOS, isSafari } from 'react-device-detect';

const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  offsetLeft: {
    // reserve a space on the left for important stuff, copy the magic 52px from multi-day events
    // marginLeft: -52,
  },
  img: {
    width: 24,
    border: '1px solid #ccc',
    borderRadius: 2,
  },
  logo: {
    '& img': {
      width: 16,
      height: 16,
    },
  },
  logoMaxSize: {
    marginRight: 6,
    marginLeft: 0,
  },
  context: {
    color: '#1a2b49',
    borderRadius: 4,
    transition: '200ms cubic-bezier(.08,.52,.52,1) background',

    '&:hover': {
      background: 'whitesmoke',
    },
  },
  contextText: {
    padding: '6px 8px',
  },
  contextLogo: {
    padding: '6px 8px',
  },
  button: {
    color: 'white',
    fontWeight: 500,

    '&:hover': {
      color: 'white',
      background: '#52525260',
    },
  },
  link: {
    color: '#114775',

    '&:hover, &:active, &:focus': {
      textDecoration: 'unset',
    },
  },
  active: {
    fontWeight: '500',
  },
  popper: {
    marginTop: 4,
    minWidth: 200,
    overflow: 'hidden',
  },
  item: {
    padding: '4px 8px',
  },
  noBorderTop: {
    borderTop: 'none',
    '& a': {
      color: 'white',
    },
    '& a:hover, & a:active, & a:focus': {
      color: 'white',
    },
  },
  heading: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 600,
    color: '#9c9c9c',
    paddingLeft: 8,
    paddingTop: 8,

    '& a': {
      color: 'unset',
    },
  },
  lastItem: {
    marginBottom: 0,
  },
  icon: {
    minWidth: 40,
    textAlign: 'center',
  },

  drawer: {
    minWidth: 300,
    maxWidth: 300,
    margin: 4,
    paddingLeft: 8,
    paddingRight: 12,
    paddingBottom: 16,
  },

  tourGrid: {
    position: 'relative',
    margin: 0,
    borderRadius: 4,
    overflow: 'hidden',
    cursor: 'pointer',
    padding: 4,

    background: '#0079BF40',
    // color: 'unset',
    // border: 'unset',
    boxShadow: 'unset',
    //
    '&:hover': {
      background: '#0079BF80',
    },
    '&:active': {
      background: '#0079BF',
    },

    '& img': {
      height: 58,
      boxShadow: 'unset',
      transition: 'transform 0.35s',
      transform: 'translate3d(-10px, 0, 0)',
    },

    '&:hover img': {
      height: 58,
      boxShadow: 'unset',
      transition: 'transform 0.35s',
      transform: 'translate3d(0, 0, 0)',
    },

    '&:hover $tourPhoto': {
      background: '#9e9e9e55',
    },
  },

  templateImageContainer: {
    minHeight: 'unset',
  },

  tourTitle: {
    marginLeft: 32,
    background: 'hsla(0, 0%, 98%, 0.82)',
    position: 'relative',
    zIndex: 1,

    '&:hover': {
      background: 'hsla(0, 0%, 98%, 0.88)',
    },
  },

  tourContent: {
    paddingLeft: 4,
    paddingTop: 1,
  },

  ellipsisDiv: {
    width: 204,
  },
  content: {
    color: '#072640',
    fontWeight: 500,
  },
  ellipsis: {
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  tourPhoto: {
    transition: 'background 0.05s',
    position: 'absolute',
    top: 0,
    left: 0,
    right: -10,
    bottom: 0,
    background: '#9e9e9e45',
  },

  collapseIcon: {
    color: '#6b778c',
  },

  noRecent: {
    color: '#6b778c',
    fontStyle: 'italic',
    marginLeft: 40,
  },

  drawerHeader: {
    background: '#f1f1f1',
    margin: '-4px -16px 0 -12px',
    padding: '8px 16px',
    fontSize: 17,
    fontWeight: 'bold',
  },

  orgName: {
    marginTop: -4,
  },
  createOrg: {
    marginLeft: 4,
  },

  minHeaderHeight: {
    minHeight: 48,
  },

  leftMenuEllipsis: {
    maxWidth: '250px',
    textAlign: 'left',
  },
  noWrap: {
    flexWrap: isIOS || isSafari ? 'nowrap' : null,
  },
  optionButton: {
    marginTop: 6,
  },
  mobileLogoMargin: {
    marginTop: '3px !important',
    padding: 4,
  },
};

export default styles;
