const style = ({ breakpoints }) => ({
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  messaging: {
    width: 320,
    display: 'flex',
    alignItems: 'center',
  },
  lineHeight: {
    lineHeight: 1.6,
  },
  chatMessengerOpen: {
    minHeight: 'calc(100vh - 95px) !important',
    backgroundColor: '#f6f8fa',
    position: 'relative',
  },
  root: {
    backgroundColor: '#f6f8fa',
    position: 'relative',
  },
  updatedTextContainer: {
    [breakpoints.down('xs')]: {
      width: '62%',
    },
  },
});

export default style;
