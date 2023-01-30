const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  header: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 600,
    color: '#595F6F',
  },
  personalHeader: {
    color: '#595F6F',
  },
  orglabel: {
    color: '#595F6F',
    fontSize: 14,
    whiteSpace: 'nowrap',
  },
  placeholder: {
    color: '#5f676b',
    fontStyle: 'italic',
    fontSize: 14,
    background: '#fff8c1',
    borderRadius: 4,
  },

  title: {
    // color: '#0a2644',
    color: '#595F6F',
    fontWeight: 400,
    fontSize: 14,
    whiteSpace: 'nowrap',
  },
  tourBy: {
    // color: '#0a2644',
    color: '#595F6F',
    fontWeight: 400,
    fontSize: 14,
  },
  linkTitle: {
    color: '#2e7fbf',
    cursor: 'pointer',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
  subtitle: {
    color: '#736c6c',
    fontSize: 12,
  },
  noOffsetTop: {
    marginTop: 0,
  },

  role: {
    padding: '0px 8px',
    background: '#fafbfc',
    borderRadius: 16,
    border: '1px solid #e3e9ef',
  },
  name: {
    fontWeight: 500,
    color: '#0a2644',
  },
  line: {
    boxShadow: '0px 1px 1px gainsboro',
    flex: 1,
    padding: 8,
    marginBottom: 10,
  },
  noPaddingRight: {
    paddingRight: 'unset !important',
  },
  noPaddingLeft: {
    paddingLeft: 'unset !important',
  },
  label: {
    color: '#595F6F',
    fontSize: 14,
  },
  link: {
    borderRadius: 4,
    color: '#013c61',
    display: 'block',
    textDecoration: 'none',

    '&:hover': {
      backgroundColor: '#e8e8e8',
      // textDecoration: 'none',
      borderBottom: `1px solid red`,
    },
    '&:active, &:focus': {
      textDecoration: 'none',
    },
  },
};

export default styles;
