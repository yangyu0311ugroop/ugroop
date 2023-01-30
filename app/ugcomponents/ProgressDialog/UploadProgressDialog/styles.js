const styles = {
  root: {
    '@media (min-width: 425px)': {
      width: 400,
      padding: '24px 32px 32px',
    },
    '@media (max-width: 425px)': {
      width: '100%',
      padding: '16px',
    },
    position: 'relative',
  },
  content: {
    zIndex: 1,
  },

  progressRoot: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    zIndex: 1,
    '@media (min-width: 600px)': {
      bottom: 24,
    },
    '@media (max-width: 600px)': {
      bottom: 16,
    },
  },
  progressColor: {
    backgroundColor: '#7873c1',
  },
  progressBackgroundColor: {
    backgroundColor: 'transparent',
  },
  logo: {
    flex: 'none',
    width: 38,
    height: 34,
  },

  pgRoot: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    borderRadius: 4,
  },
  pgBackgroundColor: {
    backgroundColor: 'transparent',
  },
  pgColor: {
    backgroundColor: '#f7f8fb',
  },

  progressBarRushed: {
    transition: 'transform 0.5s ease-out',
  },
  progressBarInstant: {
    transition: 'transform 0.1s linear',
  },
};

export default styles;
