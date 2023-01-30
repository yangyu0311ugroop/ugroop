const styles = {
  root: {
    maxWidth: 550,
  },
  formWidth: {
    maxWidth: 400,
    padding: '0 16px',
  },
  grow: {
    flex: '1',
  },
  offsetGrid: {
    padding: 8,
  },
  popOverWidth: {
    width: '350px',
  },
  btn: {
    border: 'none',
    padding: '4px 4px',
  },
  actionButton: {
    border: 'unset',
    minHeight: 'unset',
    color: '#0a2644',
    padding: '1px 8px',
    background: 'unset',
    boxShadow: 'unset',

    '&:hover': {
      background: '#ebedf0',
    },
  },
  actionButtons: {
    overflow: 'hidden',
    borderRadius: 2,
  },
  editingButton: {
    background: '#39bd3f !important',
    color: 'white !important',
    boxShadow: '0 1px 0 0 #008c06 !important',

    '&:hover': {
      backgroundColor: '#4CAF50',
    },
    '&:active': {
      backgroundColor: '#469849',
    },
  },
};

export default styles;
