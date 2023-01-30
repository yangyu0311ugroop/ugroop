const styles = {
  section: {
    flex: 1,
    zIndex: 0,
    padding: '16px 0',
    position: 'relative',
    '&:before': {
      top: 0,
      width: 1,
      zIndex: -1,
      content: '""',
      position: 'absolute',
      left: 46,
      height: 'calc(100% - 42px)',
      backgroundColor: '#cbdbe3',
    },
  },
};

export default styles;
