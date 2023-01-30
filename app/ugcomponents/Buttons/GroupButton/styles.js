export default {
  icon: {
    fontSize: '20px',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  btnMiddleBorderOnly: {
    display: 'inline-flex',
    backgroundColor: '#fff',
    color: '#babfcd',
    borderRight: '1px solid #e3e9ef',
    borderRadius: '0',
    fontSize: '17px',
    '&:first-child': {
      borderRadius: '4px 0 0 4px',
    },
    '&:last-child': {
      borderRadius: '0 4px 4px 0',
      borderRight: 'none',
    },
    '&:hover': {
      backgroundColor: 'white',
    },
    '& i[class^=lnr-]': {
      extend: 'icon',
      marginRight: '8px',
    },
  },
  noMargin: {
    margin: '0',
  },
  btn: {
    display: 'inline-flex',
    backgroundColor: '#f6f8fa',
    color: '#babfcd',
    borderTop: '1px solid #e3e9ef',
    borderBottom: '1px solid #e3e9ef',
    borderRight: '1px solid #e3e9ef',
    borderRadius: '0',
    fontSize: '14px',
    '&:first-child': {
      border: '1px solid #e3e9ef',
      borderRadius: '4px 0 0 4px',
    },
    '&:last-child': {
      borderRadius: '0 4px 4px 0',
    },
    '&:hover': {
      backgroundColor: 'white',
    },
    '& i[class^=lnr-]': {
      extend: 'icon',
      marginRight: '8px',
    },
  },
  active: {
    backgroundColor: '#fff',
    color: 'black',
    '&:hover': {
      backgroundColor: '#fff',
    },
    '& i[class^=lnr-]': {
      extend: 'icon',
      color: '#86a6eb',
    },
  },

  activeNoBorder: {
    color: '#7096ea',
  },
};
