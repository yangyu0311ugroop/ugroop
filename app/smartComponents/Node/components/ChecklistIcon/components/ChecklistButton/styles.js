const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  relative: {
    position: 'relative',
  },
  defaultButton: {
    background: '#ffffcd',
    width: 40,
    height: 40,
    transform: 'rotate(6deg)',
    borderRadius: 4,
    transition: 'unset',
    color: 'gray',

    '&:hover': {
      background: '#ffffcd',
    },
  },
  smallButton: {
    width: 32,
    height: 32,
    minWidth: 'unset',
    minHeight: 'unset',
  },
  noTransform: {
    transform: 'unset',
  },
  icon: {
    color: '#bf1750',
    position: 'absolute',
    top: -8,
    fontSize: 20,
    left: 'calc(50% - 2px)',
    zIndex: 9,
  },
  smallIcon: {},
  iconShow: {
    // transform: 'rotate(6deg)',
  },
  xsIcon: {
    position: 'absolute',
    top: -8,
    fontSize: 16,
    left: 'calc(50% - 2px)',
    zIndex: 9,
  },
  xsCount: {
    fontSize: 12,
  },
};

export default styles;
