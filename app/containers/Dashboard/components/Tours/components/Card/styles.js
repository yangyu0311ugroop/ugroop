import AvatarBG from 'shareAssets/avatarbg.png';

const styles = theme => ({
  root: {},
  grow: {
    flex: '1',
  },
  width100: {
    width: '100%',
  },
  orgNameContainer: {
    [theme.breakpoints.down('sm')]: {
      width: '64%',
    },
  },
  headingGrid: {
    paddingTop: 16,
  },
  minimiseHeadingGrid: {
    paddingTop: 8,
  },
  heading: {
    textTransform: 'uppercase',
    fontWeight: 600,

    '& a': {
      color: 'unset',
    },
  },
  gray: {
    opacity: 0.5,
  },

  firstHeading: {
    paddingTop: 0,
  },

  navButton: {
    background: '#ecedf0',
    color: '#636363',
    padding: '4px 8px',
    boxShadow: '0 1px 0 0 #c5c5c5',
    whiteSpace: 'noWrap',

    '&:hover': {
      background: '#d7d8db',
    },
  },
  collapseButton: {
    background: 'unset',
    color: '#636363',
    padding: 4,
    minHeight: 30,
    boxShadow: 'unset',

    '&:hover': {
      background: '#eaeaea',
    },
  },
  collapsedButton: {
    background: '#ecedf0',
    color: '#636363',
    padding: '4px 8px',
    boxShadow: 'unset',
    borderRadius: '50%',
    width: 32,
    height: 32,
    fontSize: 12,

    '&:hover': {
      background: '#d7d8db',
    },
  },
  collapseIcon: {
    color: '#6b778c',
  },

  // tours css

  grid: {
    minHeight: 190,
    maxHeight: 190,
    borderRadius: 4,
    padding: 16,
    cursor: 'pointer',
    boxShadow: '0 1px 0 0 #c5c5c5',
  },
  tourGrid: {
    position: 'relative',
    overflow: 'hidden',
    transition: 'background 0.1s',
    backgroundImage: `url(${AvatarBG})`,
    backgroundSize: '250%',

    '&:hover': {},
    '&:active': {
      border: '1px solid #90a0c2',
    },

    '&:hover $overlay': {
      background: 'rgba(0,0,0,.5)',
    },

    '& img': {
      transition: 'transform 1s',
    },

    '&:hover img': {
      transition: 'transform 1s',
      transform: 'scale(1.2) translateZ(0)',
    },

    '&:hover $starred': {
      transition: 'transform 0.2s',
      transform: 'translate3d(-26px, 0, 0)',
    },
  },
  relative1: {
    position: 'relative',
    zIndex: 1,
  },
  content: {
    color: 'white',
    fontWeight: 600,
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    maxHeight: 42,
    whiteSpace: 'normal',
  },
  ellipsisDiv: {
    width: '100%',
    minHeight: 42,
  },
  minHeightUnset: {
    width: '100%',
    minHeight: 'unset',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  tourPhoto: {},
  overlay: {
    transition: 'background 0.1s',
    background: 'rgba(0,0,0,.3)',
  },

  subTitle: {
    fontSize: 12,
    color: 'white',
  },
  link: {
    '&:hover, &:active, &:focus': {
      textDecoration: 'none',
    },
  },
  newTourGrid: {
    background: '#ecedf0',
    overflow: 'hidden',

    '&:hover': {
      background: '#d7d8db',
    },
  },
  newTour: {
    color: '#636363',
    fontWeight: 500,
  },
  newTourSubTitle: {
    color: '#636363',
    fontSize: 12,
  },
  tourSubTitle: {
    color: '#636363',
    fontSize: 12,
    whiteSpace: 'nowrap',
  },
  btn: {
    padding: 0,
    margin: 0,
    minWidth: 'auto',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  popOverItem: {
    backgroundColor: 'white',
    color: 'black',
    boxShadow: 'unset',
  },
  lowercase: {
    textTransform: 'lowercase',
  },
  cardKnownAsEllipsis: {
    float: 'left',
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },
});

export default styles;
