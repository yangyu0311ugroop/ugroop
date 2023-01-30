const styles = {
  root: {
    overflow: 'visible',
    position: 'relative',
  },
  paper: {
    width: 640,
    maxHeight: 660,
    margin: 8,
  },
  content: {
    minHeight: 32,
    // boxShadow: 'inset 0 0 4px #dfdfdf',
    borderTop: '1px solid #e3e9ef',
    borderBottom: '1px solid #e3e9ef',
    borderRadius: 'unset',
    marginTop: -1,
  },
  popperButton: {
    paddingLeft: 4,
    // color: '#9c9c9c',
    fontSize: 12,
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  subHeader: {
    background: '#f6e6cb',
  },
  readyWarningText: {
    fontWeight: 600,
    color: 'red',
  },
  awaingLabelText: {
    fontWeight: 600,
  },
  personalMsg: {
    flex: 1,
    fontSize: 14,
    color: 'grey',
    textAlign: 'right',
    paddingBottom: 8,
  },
};

export default styles;
