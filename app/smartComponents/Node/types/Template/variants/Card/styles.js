const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  ellipsisDiv: {
    width: '100%',
    minHeight: 46,
  },

  relative: {
    position: 'relative',

    '& $starred': {
      visibility: 'hidden',
    },

    '&:hover $starred': {
      transition: 'transform 0.2s, visibility 0.4s',
      transform: 'translate3d(-8px, 0, 0)',
      visibility: 'visible',
    },
  },

  relative1: {
    position: 'relative',
    zIndex: 1,
  },
  content: {
    color: '#e8e8e8',
    fontWeight: 600,
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    maxHeight: 42,
    whiteSpace: 'normal',
  },
  subTitle: {
    fontSize: 12,
    color: '#E0E8ED',

    opacity: 0.7,
  },
  tourPhoto: {},
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  minHeightUnset: {
    width: '100%',
    minHeight: 'unset',
  },
  overlay: {
    transition: 'background 0.1s',
    background: 'rgba(0,0,0,.5)',
  },
  unstar: {
    position: 'absolute',
    borderRadius: '50%',
    zIndex: 999,
    right: 8,
    bottom: 8,
    boxShadow: 'unset',
    background: 'unset',
    color: '#f5e02d',
    padding: '2px 8px',

    '&:hover': {
      background: 'rgba(224, 224, 224, 0.22)',
      color: '#f5e02d',
    },
  },
  starred: {
    position: 'absolute',
    borderRadius: '50%',
    zIndex: 9999,
    right: 0,
    bottom: 8,
    background: 'unset',
    boxShadow: 'unset',
    transition: 'transform 0.2s',
    padding: '2px 8px',

    '&:hover': {
      background: 'rgba(224, 224, 224, 0.32)',
    },
  },
  grid: {
    minHeight: 95,
    maxHeight: 95,
    borderRadius: 4,
    padding: 16,
    paddingTop: 16,
    cursor: 'pointer',
    boxShadow: '0 1px 0 0 #c5c5c5',
  },
  tourGrid: {
    position: 'relative',
    overflow: 'hidden',
    transition: 'background 0.1s',
    // backgroundImage: `url(${AvatarBG})`,
    backgroundColor: `#012c42`,
    backgroundSize: '250%',

    '&:hover': {
      backgroundColor: `#011a2a`,
    },
    '&:active': {},

    '&:hover $overlay': {
      background: 'rgba(0,0,0,.7)',
    },
    '&:hover $content': {
      color: 'white',
    },
    '&:hover $subTitle': {
      opacity: 1,
    },

    '& $minHeightUnset': {
      transition: 'transform 1s',
    },

    '&:hover $minHeightUnset': {
      transform: 'scale(1.2) translateZ(0)',
    },
  },
};

export default styles;
