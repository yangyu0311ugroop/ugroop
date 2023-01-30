const styles = {
  cardContent: {
    overflow: 'hidden',
    height: '132px',
    position: 'relative',

    '&:before': {
      content: '""',
      height: '16px',
      width: '100%',
      background:
        'linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(255,255,255,0.5) 70%,rgba(255,255,255,0) 100%)',
      display: 'block',
      position: 'absolute',
      zIndex: 1,
    },
    '&:after': {
      content: '""',
      height: '16px',
      width: '100%',
      background:
        'linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,0.5) 30%,rgba(255,255,255,1) 100%)',
      display: 'block',
      position: 'absolute',
      bottom: 0,
      zIndex: 1,
    },
  },
};

export default styles;
