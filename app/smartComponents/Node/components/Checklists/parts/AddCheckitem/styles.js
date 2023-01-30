const styles = {
  root: {},
  grow: {
    flex: '1',
    paddingLeft: '0px !important', // mui fix to override grid padding
  },
  addItem: {
    paddingRight: 30,
  },
  addItemIcon: {
    width: 30,
    marginLeft: 2,
    marginTop: 3,
  },
  addItemText: {
    marginBottom: 4,
    color: 'grey',
    backgroundColor: '#fbfcfd50',
    transition: 'all 0.1s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#fbfcfd',
    },
  },
  inkbar: {
    '&::after': {
      backgroundColor: '#47943c',
    },
  },
  buttons: {
    marginTop: 4,
  },
  focused: {},
  disabled: {},
  error: {},

  // override InputProps classes
  underline: {
    // inkbar on focus
    '&$focused:after': {
      borderBottom: '1px solid #444',
    },

    // inkbar on hover
    '&:hover:not($disabled):not($focused):not($error):before': {
      borderBottom: '1px solid #bbb',
    },

    // normal state inkbar
    '&:after': {
      borderBottom: '1px solid #eee',
    },
    '&:before': {
      borderBottom: '1px solid #eee',
    },
  },
};

export default styles;
