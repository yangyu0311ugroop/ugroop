const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  fullWidth: {
    width: '100%',
  },
  unstarCompressed: {
    position: 'absolute',
    borderRadius: '50%',
    zIndex: 999,
    right: 0,
    bottom: 'calc(50% - 16px)',
    minHeight: 32,
    boxShadow: 'unset',
    background: 'unset',
    color: '#f5e02d',
    paddingTop: '2px',
    paddingBottom: '2px',

    '&:hover': {
      background: 'rgba(224, 224, 224, 0.22)',
      color: '#f5e02d',
    },
  },
  contentCompressed: {
    color: '#072640',
    fontWeight: 500,
  },
  ellipsisDivCompressed: {},
  orgName: {
    marginTop: -4,
  },
  tourGridCompressed: {
    position: 'relative',
    margin: '2px 0',
    borderRadius: 4,
    overflow: 'hidden',
    cursor: 'pointer',

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
    },

    '&:hover img': {
      height: 58,
      boxShadow: 'unset',
    },

    '&:hover $tourPhoto': {
      background: '#9e9e9e55',
    },
  },
  relativeCompressed: {
    position: 'relative',

    '& $starredCompressed': {
      visibility: 'hidden',
    },
    '& $removeRecent': {
      visibility: 'hidden',
    },

    '&:hover $starredCompressed': {
      transition: 'transform 0.2s, visibility 0.4s',
      transform: 'translate3d(-16px, 0, 0)',
      visibility: 'visible',
    },
    '&:hover $removeRecent': {
      transition: 'transform 0.2s, visibility 0.4s',
      transform: 'translate3d(-16px, 0, 0)',
      visibility: 'visible',
    },
    '& $ellipsisDivCompressed': {
      width: 236,
    },

    '&:hover $ellipsisDivCompressed': {
      width: 188,
    },
  },
  tourTitle: {
    marginLeft: 32,
    background: '#FFFFFF',
    position: 'relative',
    zIndex: 1,

    '&:hover': {
      background: 'hsla(0, 0%, 98%, 0.88)',
    },
  },
  padding4: {
    padding: '0 4px',
  },
  padding8: {
    padding: '4px',
  },
  tourContent: {
    paddingLeft: 4,
    paddingTop: 1,
  },
  tourPhotoCompressed: {
    transition: 'background 0.05s',
    position: 'absolute',
    top: 0,
    left: 0,
    right: -10,
    bottom: 0,
    background: '#9e9e9e45',
  },
  templateImageContainer: {
    minHeight: 'unset',
  },
  flexWidth: {
    flex: 1,
  },
};

export default styles;
