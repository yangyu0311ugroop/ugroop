const style = {
  root: {},
  readOnly: {
    color: '#b3bcc5',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  existOrganisation: {
    border: '1px solid rgba(52, 52, 52, 0.71)',
    borderLeftWidth: '3px',
    marginLeft: 8,
    color: '#343434',
    backgroundColor: 'white',
  },
  newOrganisation: {
    border: '1px solid #a1c99c', // green
    borderLeftWidth: '3px',
    marginLeft: 8,
  },
  container: {
    fontSize: 14,
    color: 'grey',
  },
  canceled: {
    color: 'red',
  },
  button: {
    marginLeft: 8,
  },
  disabledBtn: {
    cursor: 'default',
    marginLeft: 8,
  },
  failedDisabledBtn: {
    cursor: 'default',
    marginLeft: 8,
    color: 'red',
  },
  minimise: {
    justifyContent: 'flex-start',
    paddingTop: 8,
  },
};

export default style;
