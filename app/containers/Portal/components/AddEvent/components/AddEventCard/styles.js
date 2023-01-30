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
    width: 427,
    zIndex: 1,
    height: '100vh',
    overflowY: 'auto',
    borderRight: '1px solid gainsboro',
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
