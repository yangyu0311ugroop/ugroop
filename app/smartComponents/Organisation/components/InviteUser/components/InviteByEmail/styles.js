const styles = {
  root: {
    paddingTop: 24,
    overflow: 'visible',
    position: 'relative',
    '&:after': {
      content: '" "',
      backgroundColor: '#e3e9ef',
      position: 'absolute',
      width: 'calc(100% + 48px)',
      height: 1,
      right: -24,
      top: -8,
    },
  },
  grow: {
    flex: '1',
  },
  submit: {
    marginRight: 8,
  },
  content: {
    marginBottom: 16,
  },
  sectionHeader: {
    fontWeight: 600,
  },
  error: {
    marginTop: 8,
    backgroundColor: 'rgb(255, 241, 243)',
    borderLeft: '2px solid rgb(255, 132, 155)',
    borderRadius: 4,
    padding: '8px 4px 8px 16px',
  },
  good: {
    marginTop: 8,
    backgroundColor: '#83e3774d',
    borderLeft: '2px solid #a1c99c',
    borderRadius: 4,
    padding: '8px 4px 8px 16px',
  },
  success: {
    color: '#28a745',
  },
  errorPadding: {},
};

export default styles;
