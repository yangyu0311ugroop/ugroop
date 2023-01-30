const styles = {
  root: {
    padding: 12,
    border: '1px solid #e2e2e1',
    borderRadius: 4,
    background: 'white',
  },
  rootEmpty: {
    padding: 12,
    background: 'white',
    border: '2px solid white',
  },
  grow: {
    flex: '1',
  },

  dropzone: {
    '& > input': {
      width: 0,
    },
  },
  activeClassName: {
    '& $root': {
      border: '2px solid #0087F7',
      background: '#edf6ff',
    },
    '& $rootEmpty': {
      border: '2px solid #0087F7',
      background: '#edf6ff',
    },
  },

  left: {
    width: 36,
    minWidth: 36,
  },

  progressRoot: {
    borderRadius: 3,
    height: 6,
  },
  colorPrimary: {
    background: 'rgb(234, 234, 234)',
  },
  barColorPrimary: {
    background: '#2196F3',
  },

  borderTop: {
    borderTop: '1px solid gainsboro',
  },
  border: {
    border: '1px solid gainsboro',
    padding: '8px 16px',
    borderRadius: 4,
  },
  progress: {
    width: 70,
    minWidth: 70,
  },
  dropzoneSimple: {
    // backgroundColor: '#edf2f4',
    cursor: 'pointer',
    '& > input': {
      width: 0,
    },
  },
};

export default styles;
