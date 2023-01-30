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
  ellipsisDiv: {
    width: '100%',
    // minHeight: 46,
  },
  relative1: {
    position: 'relative',
    zIndex: 1,
    marginTop: 4,
  },
  navTitle: {
    '&:hover': {
      background: 'unset',
      textDecoration: 'underline',
    },
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
};

export default styles;
