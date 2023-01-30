const styles = {
  root: {
    height: '100%',
  },
  grow: {
    flex: '1',
  },
  placeholderCropper: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    '& > div': {
      height: '100%',
    },
  },
  hideFramePlaceholder: {
    boxShadow: 'unset',
  },
  imageCropperContainer: {
    height: '100%',
    position: 'relative',
  },
  dialogContainer: {
    maxWidth: 'auto',
    width: '100%',
    '& > div:last-child': {
      maxWidth: 'inherit',
    },
  },
  template: {
    '& > div:last-child': {
      width: 1078,
    },
  },
  day: {
    '& > div:last-child': {
      width: 345,
    },
  },

  borderRadius: {
    borderRadius: 4,
  },
  resize: {
    overflow: 'hidden',

    '& img': {
      boxShadow: 'unset',
    },
  },
  hideFrameResize: {
    background: 'unset',
  },
  resize24: {
    width: 24,
    height: 24,

    '& img': {
      height: 24,
    },
  },
  resize36: {
    width: 36,
    height: 36,

    '& img': {
      width: 36,
      height: 36,
    },
  },
  resize48: {
    width: 48,
    height: 48,

    '& img': {
      width: 48,
      height: 48,
    },
  },
  resize72: {
    width: 72,
    height: 72,

    '& img': {
      width: 72,
      height: 72,
    },
  },
  resize90: {
    width: 90,
    height: 90,

    '& img': {
      width: 90,
      height: 90,
    },
  },
  resize130: {
    width: 130,
    height: 130,

    '& img': {
      width: 130,
      height: 130,
    },
  },
  resize270: {
    width: 270,
    height: 165,

    '& img': {
      width: 270,
      height: 165,
    },
  },
  resize1200: {
    width: 'unset',
    height: 'unset',
    maxHeight: '50vh',
    borderRadius: 0,
    borderTop: '1px solid gainsboro',
    borderBottom: '1px solid gainsboro',

    '& img': {
      width: 'unset',
      height: 'unset',
      maxHeight: 680,
      maxWidth: '100%',
      borderRadius: 0,
    },
  },
  resize500: {
    '& img': {
      width: 'unset',
      height: 'unset',
      minWidth: '30vh',
      maxWidth: 'calc(100vw - 47px)', // hard code the width of dialog
      maxHeight: 'calc(100vh - 96px)', // hard code the height of dialog
    },
  },
  fullWidth: {
    width: 'unset',
    height: 'unset',
    borderRadius: 0,
    borderTop: '1px solid gainsboro',
    borderBottom: '1px solid gainsboro',

    '& img': {
      width: 'unset',
      height: 'unset',
      maxHeight: 300,
      borderRadius: 0,
      maxWidth: '100%',
    },
  },
};

export default styles;
