const styles = {
  root: {},
  grow: {
    flex: '1',
  },

  bg: {
    background: '#3f51b5',
    padding: 24,
    paddingBottom: 4,
    maxWidth: 'calc(100vw - 407px)',
    minWidth: 'calc(100vw - 407px)',
    position: 'relative',
  },
  bgEdit: {
    background: '#3f51b5',
    padding: 24,
    paddingBottom: 4,
    maxWidth: 'calc(100vw - 427px)',
    minWidth: 'calc(100vw - 427px)',
    position: 'relative',
  },
  bgSm: {
    background: '#3f51b5',
    padding: 24,
    paddingBottom: 4,
    maxWidth: '100vw',
    minWidth: '100vw',
    position: 'relative',
  },

  eventGrid: {
    maxWidth: 600,
    minWidth: 600,
  },
  eventGridSm: {},
  eventDetailGridSm: {
    maxWidth: '100vw',
    minWidth: '100vw',
    background: 'white',
    boxShadow: '1px 0 3px 0px gainsboro',
    borderRadius: 8,
    padding: 16,
  },
  eventDetailGrid: {
    maxWidth: 800,
    minWidth: 800,
    background: 'white',
    boxShadow: '1px 0 3px 0px gainsboro',
    borderRadius: 8,
    padding: 16,
  },
  closeSm: {
    position: 'absolute',
    right: 8,
    top: 8,
  },
};

export default styles;
