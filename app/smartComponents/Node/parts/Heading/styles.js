const styles = {
  root: {
    maxWidth: 450,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  normal: {
    textAlign: 'center',
    width: '100%',
  },
  marginTop: {
    marginTop: 16,
  },
  marginTopXs: {
    marginTop: 16,
  },
  grow: {
    flex: '1',
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    color: '#1a73e8',
  },
  titleCollapsed: {
    color: '#595F6F',
  },
  titleXs: {
    fontSize: 14,
  },
  description: {
    fontSize: 14,
  },
  button: {
    borderRadius: 0,
    transition:
      '400ms cubic-bezier(.08,.52,.52,1) background-color, 400ms cubic-bezier(.08,.52,.52,1) boxShadow',

    '&:hover': {
      backgroundColor: '#fafbfc',
      boxShadow: '0 1px 0 0 #e3e9ef, 0 -1px 0 0 #e3e9ef',
      zIndex: 2,
    },
  },
  editableButton: {
    '&:hover': {
      backgroundColor: '#E0E8ED',
    },
  },
  icon: {
    marginLeft: 8,
    marginRight: 8,
    width: 20,
    textAlign: 'center',
    borderRadius: '50%',
  },
  iconXs: {
    // marginLeft: 2,
    // marginRight: 2,
  },
  marginTopHeader: {
    marginTop: 25,
  },
  marginTopHeaderXS: {
    marginTop: 0,
  },
};

export default styles;
