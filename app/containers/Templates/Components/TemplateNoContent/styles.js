const stylesheet = {
  noContent: {
    backgroundColor: '#fbfcfd',
    paddingTop: '50px',
    paddingBottom: '50px',
    marginBottom: '10px',
    width: '100%',
    textAlign: 'center',
  },
  title: {
    color: '#76809a',
    marginBottom: '8px',
    fontSize: '14px',
  },
  subTitle: {
    fontSize: 14,
    fontWeight: 400,
    color: '#607D8B',
    maxWidth: 400,
  },
  noContentMargin: {
    paddingTop: 40,
    paddingBottom: 60,
    background: '#fbfcfd',
  },
  noContentLoading: {
    paddingTop: 40,
    paddingBottom: 60,
  },
  btn: {
    background: 'transparent',
    borderRadius: 4,
    padding: 4,
    cursor: 'pointer',
    boxShadow: '1px 1px 3px 0px white',
    overflow: 'hidden',

    '&:hover': {
      background: '#d7d8db',
    },
  },
  label: {
    color: '#636363',
    fontWeight: 500,
    whiteSpace: 'nowrap',
  },
};

export default stylesheet;
