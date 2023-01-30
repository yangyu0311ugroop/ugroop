const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  ellipsisDiv: {
    width: '100%',
    // minHeight: 46,
  },

  relative: {
    position: 'relative',
  },

  relative1: {
    position: 'relative',
    zIndex: 1,
  },
  content: {
    color: '#1a2b49',
    fontWeight: 600,
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    maxHeight: 42,
    whiteSpace: 'normal',
    fontSize: 14,
  },
  subtitle: {
    color: '#6d7688',
    fontSize: 11,

    // opacity: 0.7,
  },
  tourPhoto: {
    borderRadius: 0,
    minHeight: 65,
    background: '#607D8B',
    margin: -16,
    marginBottom: 8,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  minHeightUnset: {
    width: '100%',
    minHeight: 65,
    height: 65,
  },
  overlay: {
    transition: 'background 0.1s',
    background: 'unset',
  },
  unstar: {
    position: 'absolute',
    borderRadius: '50%',
    zIndex: 999,
    right: 16,
    top: 14,
    boxShadow: '0px 0px 5px 1px rgba(255, 251, 218, 0.5)',
    background: 'rgba(0, 0, 0, 0.45)',
    color: '#ffe400',
    padding: '0 6px',
    paddingLeft: 7,
    paddingBottom: 1,

    '&:hover': {
      background: 'rgba(0, 0, 0, 0.75)',
      color: '#ffe400',
    },
  },
  starred: {
    position: 'absolute',
    borderRadius: '50%',
    zIndex: 9999,
    right: 8,
    top: 14,
    boxShadow: 'unset',
    transition: 'transform 0.2s',
    padding: '0 6px',
    paddingLeft: 7,
    paddingBottom: 1,

    color: 'black',
    background: 'rgba(255, 255, 255, 0.85)',

    '&:hover': {
      color: 'black',
      background: 'rgba(255, 255, 255, 0.95)',
    },
  },
  grid: {
    // cursor: 'pointer',
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
  cardMinimal: {
    minHeight: 144,
  },
  startDate: {
    // paddingTop: 4,
    paddingRight: 4,
  },
  viewed: {
    fontStyle: 'italic',
    color: '#609',
  },
  published: {
    // background: '#00aa71',
    color: '#018830',
    // fontWeight: 500,
    // padding: '0 4px',
    // borderRadius: 2,
    // boxShadow: '1px 1px 1px 0px #00796e',
  },
  navTitle: {
    '&:hover': {
      background: 'unset',
      textDecoration: 'underline',
    },
  },
  description: {
    color: '#1a2b49',
    fontSize: 13,
  },
  branding: {
    color: '#1a2b49',
    fontSize: 12,
  },
  ellipsis3: {
    '-webkit-line-clamp': 3,
  },
  createdBy: {
    maxWidth: 70,
  },
  arrowHover: {
    '& $nextButton': {
      transform: 'translateX(-2px)',
    },
    '&:hover $nextButton': {
      transform: 'translateX(2px)',
    },
    '& $prevButton': {
      transform: 'translateX(2px)',
    },
    '&:hover $prevButton': {
      transform: 'translateX(-2px)',
    },
  },
};

export default styles;
