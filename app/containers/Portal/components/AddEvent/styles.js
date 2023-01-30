const styles = {
  root: {},
  grow: {
    flex: '1',
  },

  notScrollable: {
    height: '100vh',
    overflow: 'hidden',
  },

  scrollableX: {
    height: '100vh',
    overflowY: 'auto',
    // overflowX: 'hidden',
  },

  left: {
    width: 456,
    // boxShadow: '2px 0px 3px 0px gainsboro',
    zIndex: 1,
    height: '100vh',
    overflowY: 'auto',
    // overflowX: 'hidden',
  },

  content: {
    maxWidth: 800,
    minWidth: 800,
  },
  contentClassName: {
    background: '#f6f8fa',
    position: 'relative',
  },
  contentSm: {
    width: '100vw',
    maxWidth: '100vw',
  },

  header: {
    background: 'white',
    boxShadow: '0px 1px 1px gainsboro',
    marginBottom: 16,
    padding: 16,
    width: '100%',
  },
  eventContent: {
    background: '#f6f8fa',
    padding: 16,
    borderRadius: 8,
    boxShadow: 'inset 0px 0px 1px 0px #8080806b',
  },
};

export default styles;
