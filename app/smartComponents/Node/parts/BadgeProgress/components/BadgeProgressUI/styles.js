const styles = {
  root: {
    color: 'grey',
  },
  grow: {
    flex: '1',
  },
  progress: {
    minWidth: 80,
  },
  xs: {
    height: 1,
  },
  sm: {
    height: 3,
  },
  md: {
    height: 5,
  },
  lg: {
    height: 7,
  },
  progressBackground: {
    backgroundColor: '#eaecef',
  },
  progressOutstanding: {
    backgroundColor: '#2cbe4e',
  },
  progressCompleted: {
    backgroundColor: '#2cbe4e',
  },
  completedMessage: {
    color: '#47943c',
  },
  remaining: {},
  remainingSome: {},
  remainingNone: {},
  percentage: {},
  summaryItem: {},
  fade: {
    opacity: 0.6,
  },
  text: {
    color: '#9c9c9c',
  },
  asIconButton: {
    padding: 4,
    width: 32,
    height: 32,
  },
  iconGrid: {
    border: '1px solid rgb(216, 218, 223)',
    background: '#ffffcd',
    width: 26,
    height: 26,
    transform: 'rotate(6deg)',
    borderRadius: 4,
    transition: 'unset',
    color: 'gray',
    maxWidth: 'unset',
    fontSize: 12,
    paddingTop: 2,
    '& i': {
      fontSize: 10,
    },
  },
  pinIcon: {
    color: '#bf1750',
    position: 'absolute',
    fontSize: 13,
    left: 18,
    zIndex: 9,
    borderRadius: '50%',
    lineHeight: '13px',
    paddingLeft: 1,
    bottom: 19,
    fontWeight: 100,
    // right: 5,
  },
  selected: {
    transform: 'none !important',
  },
  preComplete: {
    background: 'rgb(216, 218, 223)',
  },
  pinIconPreComplete: {
    color: 'darkgray !important',
  },
};

export default styles;
