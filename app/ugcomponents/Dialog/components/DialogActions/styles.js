const styles = {
  root: {
    display: 'flex',
  },
  defaultBtnText: {},
  grow: {
    flex: 1,
  },
  defaultCancel: {
    margin: '0 16px 0 0',
    border: '1px solid #e3e9ef',
  },
  fullWidth: {
    width: '100%',
  },
  defaultConfirm: {
    flex: 1,
    margin: 0,
    padding: 16,
    color: '#ffffff',
    backgroundColor: '#86a6eb',
    '&:hover': {
      backgroundColor: '#a0b6eb',
    },
  },
  greenConfirm: {
    flex: 1,
    margin: 0,
    padding: 16,
    color: '#ffffff',
    backgroundColor: '#39bd3f',
    boxShadow: '0 1px 0 0 #008c06',
    border: '1px solid #39bd3f',

    '&:hover': {
      backgroundColor: '#4CAF50',
    },
    '&:active': {
      backgroundColor: '#469849',
    },
  },
  redConfirm: {
    flex: 1,
    margin: 0,
    padding: 16,
    color: '#ffffff',
    backgroundColor: '#d75b7f',
    '&:hover': {
      backgroundColor: '#ff89a8',
    },
  },
  disabled: {
    opacity: 0.2,
  },
  grid: {
    margin: -4,
  },
  confirmButton: {
    minWidth: 100,
  },
};

export default styles;
