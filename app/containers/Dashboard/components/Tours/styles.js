import AvatarBG from 'shareAssets/avatarbg.png';

const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  headingGrid: {
    paddingTop: 24,
  },
  firstHeading: {
    paddingTop: 0,
  },
  grid: {
    minHeight: 95,
    maxHeight: 95,
    borderRadius: 4,
    padding: 16,
    cursor: 'pointer',
    boxShadow: '0 1px 0 0 #c5c5c5',
  },
  relative1: {
    position: 'relative',
    zIndex: 1,
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
  newTourGrid: {
    background: '#ecedf0',

    '&:hover': {
      background: '#d7d8db',
    },
  },
  vcenter: {
    marginTop: 18,
  },

  subTitle: {
    fontSize: 12,
    color: 'white',
  },

  newTour: {
    color: '#636363',
    fontWeight: 500,
  },
  newTourSubTitle: {
    color: '#636363',
    fontSize: 12,
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

  starred: {
    position: 'absolute',
    right: -18,
    bottom: 8,
    background: 'unset',
    boxShadow: 'unset',
    transition: 'transform 0.2s',

    '&:hover': {
      background: 'unset',
      color: '#e0bf00',
    },
  },

  navButton: {
    background: '#ecedf0',
    color: '#636363',
    padding: '4px 8px',
    boxShadow: 'unset',

    '&:hover': {
      background: '#d7d8db',
    },
  },
  link: {
    '&:hover, &:active, &:focus': {
      textDecoration: 'none',
    },
  },

  collapseIcon: {
    color: '#6b778c',
  },

  adornment: {
    color: '#acb2c1',
    maxHeight: 'unset',
  },

  searchContainer: {
    minWidth: 250,
  },

  offsetFirst: {
    marginTop: -42,
  },

  marginTop: {
    marginTop: 8,
  },
};

export default styles;
