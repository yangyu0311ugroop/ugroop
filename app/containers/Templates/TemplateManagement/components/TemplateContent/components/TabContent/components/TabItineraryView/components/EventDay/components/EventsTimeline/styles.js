const styles = {
  root: {
    borderRadius: 4,
    paddingTop: 0,
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: 'white',
    position: 'relative',
  },
  grow: {
    flex: '1',
    minHeight: 90,
  },
  text: {
    color: '#495873',
    fontSize: '17px',
    fontWeight: '600',
    marginBottom: '8px',
  },
  btnPlacement: {
    position: 'absolute',
    left: -44,
  },
  btn: {
    backgroundColor: 'white',
    '&:hover': {
      boxShadow: '0 2px 4px 0 #e3e9ef',
      backgroundColor: 'white',
    },
  },
  timeline: {
    paddingRight: 0,
    position: 'relative',
    left: -44,
  },
  timeZone: {
    position: 'absolute',
    backgroundColor: 'white',
    bottom: 0,
    left: 0,
    textAlign: 'center',
    fontSize: '0.75em',
    color: '#7D7968',
    fontWeight: 600,
    width: 32,
    marginBottom: 5,
  },
  timelineCard: {
    border: 'solid 1px #e3e9ef',
    padding: 16,
    paddingRight: 0,
    marginTop: 10,
  },
};

export default styles;
