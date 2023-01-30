const styles = {
  root: {
    background: 'white',
    width: '100%',
    border: '1px solid rgb(209, 213, 221)',
    borderTop: 'none',
    padding: 8,
    paddingLeft: 16,
    paddingRight: 0,
  },
  titleContainer: {
    cursor: 'pointer',
    flexWrap: 'unset',
  },
  grow: {
    flex: '1',
  },
  smallHeader: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  titleWrapper: {
    width: '100%',
  },
  buttons: {},
  tourTitle: {
    color: '#202840',
    fontSize: 17,
    fontWeight: '600',
    flex: '1',
  },
  logo: {
    height: 'auto',
    width: 30,
  },
  label: {
    padding: 4,
  },
  optContainer: {
    paddingLeft: 4,
  },
  active: {
    color: 'black',
    '&:hover': {
      backgroundColor: '#f6f8fa',
    },
  },
  listItem: {
    display: 'inline-flex',
    backgroundColor: 'transparent',
    color: '#babfcd',
    borderRadius: '0',
    paddingRight: 4,
    fontSize: '14px',
  },
  firstItem: {
    color: 'black',
    paddingTop: 2,
  },
  optionView: {
    border: '1px solid #edf2f4',
    borderRadius: 4,
  },
  activeIconItem: {
    color: '#86a6eb',
  },
};

export default styles;
