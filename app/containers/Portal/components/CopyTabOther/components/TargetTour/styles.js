const styles = {
  root: {},
  grow: {
    flex: '1',
  },

  fade: {
    opacity: 0.3,
  },
  borderRight: {
    borderRight: '1px solid #eee',
  },
  heading: {
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: 500,
    color: '#8a8a8a',
  },
  noWrapText: {
    whiteSpace: 'nowrap',
  },
  tour: {
    flex: 1,
    margin: 'auto',
    color: '#072640',
    fontWeight: 500,
  },
  tourGridCompressed: {
    position: 'relative',
    margin: '2px 0',
    borderRadius: 4,
    overflow: 'hidden',
    cursor: 'pointer',

    // background: '#0079BF40',
    // color: 'unset',
    // border: 'unset',
    boxShadow: 'unset',
    //
    '&:hover': {
      background: 'rgba(212,224,231,0.5)',
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
  },
};

export default styles;
