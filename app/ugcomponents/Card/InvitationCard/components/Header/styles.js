const styles = ({ breakpoints }) => ({
  root: {},
  grow: {
    flex: '1',
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },
  header: {
    backgroundColor: '#fbfcfd',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottom: '1px solid #e3e9ef',
  },
  padding: {
    padding: 12,
  },
  paddingMobile: {
    padding: '12px 0px 12px 0px',
  },
  iconGrid: {
    marginBottom: -5,
    [breakpoints.up('md')]: {
      marginRight: 16,
    },
    [breakpoints.down('sm')]: {
      marginRight: 0,
    },
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495873',
  },
  expandBtn: {
    marginBottom: -5,
    marginRight: 16,
  },
  closeButton: {
    position: 'relative',
    margin: 0,
  },
});

export default styles;
