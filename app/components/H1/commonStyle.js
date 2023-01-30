const styleSheet = theme => {
  const fontColor = theme.colorTone === 'warm' ? '#36322F' : '#4C5673';
  return {
    headerCommon: {
      fontWeight: 400,
      margin: 0,
      color: fontColor,
      fontFamily: 'IBM Plex Sans, sans-serif',
      lineHeight: '1.6',
    },
    error: {
      color: '#ff1744',
    },
    success: {
      color: '#7097EB',
    },
    light: {
      fontWeight: 300,
    },
    bold: {
      fontWeight: 700,
    },
    black: {
      fontWeight: 900,
    },
    textCenter: {
      textAlign: 'center',
    },
  };
};

export default styleSheet;
