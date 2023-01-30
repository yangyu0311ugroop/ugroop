const styles = {
  sectionLink: {
    marginBottom: 0,
  },
  divider: {
    marginTop: 28,
    marginBottom: 8,
  },
  textHelper: {
    padding: 0,
    outline: 'none',
    border: 'none',
    background: 'none',
    color: '#ACB2C1',
    marginBottom: 8,
    transition: 'all ease-in 0.22s',
    '&:hover': {
      color: '#337ab7',
      transition: 'all linear 0.1s',
    },
  },
  errors: {
    padding: '10px 5px 10px 12px',
    backgroundColor: 'rgb(255, 241, 243)',
    borderLeft: '2px solid rgb(255, 132, 155)',
    borderRadius: 2,
    marginTop: 12,
  },
  passwordContainer: {
    '& > div': {
      position: 'relative',
    },
    '& > div > div:nth-child(2)': {
      position: 'absolute',
      right: '0',
      bottom: -4,
    },
  },
  btn: {
    padding: '16px',
  },
  info: {
    borderRadius: 4,
    marginBottom: 24,
    padding: '16px 24px',
    backgroundColor: '#edf2f4',
  },

  input: {
    display: 'flex',
    alignItems: 'center',
  },
  startAdornmentIcon: {
    color: '#ACB2C1',
    marginRight: '8px',
  },
  endAdornmentIcon: {
    color: '#ACB2C1',
  },
  endAdornmentBtn: {
    border: 'unset',
    margin: 0,
    height: 'unset',
    background: 'unset',

    '&:hover': {
      border: 'unset',
      boxShadow: 'unset',
      background: 'unset',
    },
  },
  lineHeight: {
    lineHeight: '1.5em',
  },
  loginAs: {
    paddingTop: 8,
  },
  verificationError: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 0,
  },
  verificationErrorParagraph: {
    marginBottom: 8,
  },
  resend: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: 0,
  },
};

export default styles;
