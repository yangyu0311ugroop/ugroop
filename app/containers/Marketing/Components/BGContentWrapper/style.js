export default {
  root: {
    position: 'relative',
    height: '100%',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      background:
        'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
      filter:
        'progid:DXImageTransform.Microsoft.gradient( startColorstr="#ffffff ", endColorstr="#ffffff ", GradientType=0 )',
    },
  },
  override: {
    backgroundColor: '#fff',
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: '0',
    left: '0',
    opacity: '0.8',
    zIndex: '9',
  },
  wrappedItem: {
    zIndex: '99',
    position: 'relative',
  },
  fullViewportHeight: {
    height: '100vh',
  },
  halfViewportHeight: {
    height: '70vh',
  },
};
