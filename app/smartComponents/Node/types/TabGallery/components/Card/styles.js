const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  paddingLeft: {},
  header: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 600,
    color: '#9c9c9c',
  },

  smallText: {
    fontSize: 12,
    padding: '0px 8px',
    minHeight: 'unset',
  },
  photoGrid: {
    borderRadius: 8,
    overflow: 'hidden',
    margin: -1,
    width: 250,
  },

  photoFrame: {
    margin: 1,
    minWidth: 48,
    minHeight: 48,
    background: '#f6f8fa',
  },

  noPhoto: {
    color: '#9c9c9c',
    fontStyle: 'italic',
    fontSize: 12,
  },
  photoCountText: {
    flex: 1,
    color: '#9c9c9c',
    fontSize: 12,
    padding: 0,
    fontStyle: 'italic',
  },
  showMore: {
    fontSize: 12,
  },
  photoCount: {
    paddingBottom: 0,
  },
  avatar: {
    position: 'absolute',
    zIndex: 2,
  },
};

export default styles;
