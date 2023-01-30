const styles = {
  sliderWrapper: {
    padding: 20,
    display: 'flex',
    '&:before': {
      fontFamily: 'LinearIcons',
      content: '"\\e70e"',
      padding: '0 20px',
      color: '#b7bcc9',
      fontSize: '20px',
      marginTop: -6,
    },
    '&:after': {
      fontFamily: 'LinearIcons',
      content: '"\\e70e"',
      padding: '0 20px',
      marginTop: -13,
      fontSize: '30px',
      color: '#b7bcc9',
    },
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 20px',
  },
  actionBtnContainer: {
    display: 'flex',
  },
  actionBtn: {
    marginRight: '8px',
    '&:last-child': {
      marginRight: '0',
    },
  },
};

export default styles;
