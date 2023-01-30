const stylesheet = theme => ({
  sidebar: {
    color: 'white',
    '& h4, & h1': {
      color: 'white',
    },
    '& h1': {
      fontWeight: 700,
      marginTop: 0,
    },
    '& hr': {
      opacity: '0.5',
    },
  },
  fontWeightLight: {
    height: 35,
    '& p': {
      fontWeight: theme.typography.fontWeightLight,
    },
  },
  form: {
    transform: 'translateX(30px)',
    opacity: 0,
    transition: 'opacity ease-in-out .15s, transform ease-in-out .15s',
  },
  fadeIn: {
    opacity: 1,
    transform: 'translateX(0)',
  },
  fadeOut: {
    opacity: 0,
  },
  btn: {
    padding: '16px',
  },
  selectedAddress: {
    border: '1px solid grey',
  },
  info: {
    borderRadius: 4,
    margin: '12px 0',
    padding: '16px 24px',
    backgroundColor: '#edf2f4',
  },
  errors: {
    padding: '10px 5px 10px 12px',
    backgroundColor: 'rgb(255, 241, 243)',
    borderLeft: '2px solid rgb(255, 132, 155)',
    borderRadius: 2,
    marginTop: 12,
  },
  input: {
    position: 'relative',
  },
  inputWithAdornment: {
    alignItems: 'center',
  },
  icon: {
    marginRight: '8px',
    color: '#8e94a2',
  },
  endAdornmentBtn: {
    position: 'absolute',
    bottom: 16,
    right: 0,
    width: '32px',
    height: '32px',
    borderWidth: '0',
    margin: '0',
    marginBottom: '8px',
    '&:hover': {
      borderWidth: '0',
      boxShadow: '0 0 0 #000',
      backgroundColor: 'transparent',
    },
  },
  lineHeight: {
    lineHeight: '1.5em',
  },
  space: {
    paddingTop: 8,
  },
  agreementTextPolicy: {
    color: '#86a6eb',
    cursor: 'pointer',
    paddingLeft: 3,
    margin: 0,
  },
  agreementText: {
    paddingLeft: 3,
    margin: 0,
  },
  termsAndPolicy: {
    display: 'flex',
  },
  Dialog: {
    width: 960,
    maxWidth: 'unset',
    // height: 1384,
  },
  dialogParent: {
    width: 960,
    height: '100%',
    maxHeight: 'unset',
    overflowY: 'hidden',
    overflowX: 'hidden',
  },
  radioGroup: {
    flexDirection: 'row',
  },
  formLabel: {
    fontSize: 12,
    fontWeight: 500,
    margin: 0,
  },
  orgTypeOption: {
    paddingTop: 8,
  },
  radioClass: {
    fontSize: 5,
  },
  labelHeight: {
    lineHeight: '1.5em',
    marginBottom: 4,
  },
  registerContainer: {
    paddingTop: 16,
  },
  goToLoginContainer: {
    paddingBottom: 16,
  },
  textColor: {
    color: 'green',
  },
  overrideColor: {
    color: 'inherit',
  },
});

export default stylesheet;
