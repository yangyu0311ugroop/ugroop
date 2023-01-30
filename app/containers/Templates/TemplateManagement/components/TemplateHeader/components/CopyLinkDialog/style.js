const styles = {
  urlContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noHr: {
    '& hr': {
      display: 'none',
    },
  },
  paddingButtom: {
    paddingBottom: '4px',
  },
  content: {
    paddingTop: 16,
  },
  emptyContent: {
    paddingTop: 22,
    paddingLeft: 14,
  },
  label: {
    color: '#595F6F',
    fontWeight: 500,
  },
  textFieldInput: {
    width: '94%',
  },
  textFieldRoot: {
    display: 'flex',
    flexGrow: 3,
    position: 'relative',
  },
  tooltip: {
    right: 21,
    position: 'absolute',
  },
  copy: {
    flex: 1,
    margin: 0,
    fontWeight: 600,
    border: 'none',
    boxShadow: 'none',
    backgroundColor: '#a1c99c',
    '&:hover': {
      backgroundColor: '#a9c9a2',
    },
  },
  greenIcon: {
    '& > i': {
      color: '#a1c99c',
    },
  },
  removeLink: {
    color: '#ffffff',
    backgroundColor: '#d75b7f',
    '&:hover': {
      backgroundColor: '#d75b7f',
    },
  },
  selectRoot: {
    width: '100%',
    backgroundColor: 'white',
    borderBottom: '1px solid #ccc',
  },
  checkBox: {
    marginBottom: -14,
  },
  checkBoxRoot: {
    padding: '8px 0',
  },
  share: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 28px',
    backgroundColor: '#edf3f4',
  },
  shareButtons: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 14,
    '& > a': {
      marginLeft: 2,
      marginRight: 2,
    },
  },
};

export default styles;
