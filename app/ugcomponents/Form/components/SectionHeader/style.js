const styleSheet = theme => {
  const fontColor = theme.colorTone === 'warm' ? 'white' : '#4C5673';
  return {
    root: {
      color: fontColor,
      marginBottom: 0,
      marginTop: 0,
      fontWeight: 400,
    },
    wrapper: {
      marginTop: 16,
    },
    wrapperFirst: {
      marginTop: 0,
    },
    actions: {
      marginBottom: 0,
      '& a h5': {
        marginBottom: 0,
      },
      '& label': {
        marginBottom: '-8px',
      },
      '& label p': {
        fontSize: 14,
      },
    },
    noWrap: {
      flexWrap: 'nowrap',
    },
  };
};

export default styleSheet;
