const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  default: {
    fontStyle: 'unset',
  },
  padding: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  defaultPadding: {
    marginLeft: 4,
  },
  dense: {
    padding: 0,
    margin: 0,
  },
  readOnly: {
    borderColor: 'transparent',
    background: 'unset',
    padding: 'unset',
    fontStyle: 'unset',
    color: '#586069',
    marginTop: 'unset',
  },
  compressed: {
    borderColor: 'transparent',
    background: 'unset',
    padding: 'unset',
    fontStyle: 'unset',
    color: '#586069',
    marginTop: 'unset',
  },
  editableDescription: {
    transition: '.2s ease-in-out',
  },
  iconHidden: {
    visibility: 'hidden',
    border: '1px solid transparent',
  },
  hover: {
    transition: '.2s ease-in-out',
    cursor: 'pointer',

    '&:hover $editableDescription': {
      border: '1px solid #9E9E9E',
      backgroundColor: '#fbfcfd',
    },

    '&:hover $iconHidden': {
      visibility: 'visible',
    },
  },
  buttons: {
    marginTop: 4,
  },
  empty: {
    fontStyle: 'italic',
    padding: 8,
  },
  header: {},
  hashkeyLabel: {
    color: '#595F6F',
    fontWeight: 500,
  },
};

export default styles;
