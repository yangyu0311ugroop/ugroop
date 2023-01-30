const styles = {
  root: {
    height: '100vh',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#f6f8f9',
  },
  header: {
    height: 240,
    paddingTop: 40,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#1f273d',
  },
  bodyGrid: {
    top: 144,
    width: '100%',
    position: 'absolute',
  },
  container: {
    maxWidth: 560,
    borderRadius: 4,
    margin: '0 auto',
  },
  body: {
    padding: 32,
    backgroundColor: '#fff',
  },
  bodyFooter: {
    padding: '24px 32px',
    backgroundColor: '#edf2f4',
  },
  bodyFooterText: {
    margin: 0,
    fontWeight: 600,
  },
  declineTitle: {
    marginTop: 0,
    fontWeight: 600,
  },
  label: {
    fontWeight: 600,
  },
  hr: {
    borderTop: '1px solid #edf2f4',
  },
  buttonRoot: {
    display: 'flex',
  },
  backToHomeRoot: {
    justifyContent: 'center',
  },
  backToHomeButton: {
    flex: 1,
    marginRight: 16,
    color: '#fff',
    padding: '16px 24px',
    backgroundColor: '#7097eb',
    '&:hover': {
      backgroundColor: '#7097ec',
    },
    width: '100%',
  },
  submit: {
    flex: 1,
    marginRight: 16,
    color: '#fff',
    padding: '16px 24px',
    backgroundColor: '#7097eb',
    '&:hover': {
      backgroundColor: '#7097ec',
    },
  },
  skip: {
    color: '#2b344d',
    padding: '16px 24px',
    border: '1px solid #e3e9ef',
    backgroundColor: '#fff',
  },
  footerContent: {
    display: 'flex',
    marginBottom: 32,
    justifyContent: 'space-between',
  },

  footerLinks: {
    display: 'flex',
    '& > a': {
      textDecoration: 'none',
    },
    '& > a:not(:last-child)': {
      paddingRight: 16,
    },
  },

  footerLinkText: {
    color: '#86a6eb',
    fontWeight: 600,
  },

  copyright: {
    color: '#acb2c1',
    fontWeight: 600,
  },
};

export default styles;
