const styles = {
  root: {
    padding: 40,
  },
  paper: {
    width: 700,
    maxWidth: 700,
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 16,
    '& > h4': {
      margin: 0,
      fontWeight: 600,
      paddingLeft: 24,
    },
  },
  logo: {
    width: 37,
    height: 37,
  },
  closeBtn: {
    flex: 1,
    borderRadius: 4,
    padding: '8px 16px',
    margin: '16px 0 0',
    color: '#ffffff',
    backgroundColor: '#7097eb',
    '&:hover': {
      backgroundColor: '#a0b6eb',
    },
  },
  closeDialogButton: {
    padding: '2px 8px',
    zIndex: 2,
    boxShadow: 'unset',
    color: '#4c5673',
    background: 'unset',

    '&:hover': {
      background: '#ebedf0',
    },
  },
  noTextWrap: {
    whiteSpace: 'nowrap',
  },
};

export default styles;
