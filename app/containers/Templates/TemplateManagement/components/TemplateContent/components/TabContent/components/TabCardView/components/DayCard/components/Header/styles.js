const styles = {
  root: {
    borderRadius: '5px 5px 0 0',
  },
  container: {
    marginBottom: '8px',
    borderBottom: '1px solid #e3e9ef',
    padding: '4px 16px',
    paddingRight: 12,
  },
  weekendHeader: {
    backgroundColor: '#F44336',
  },
  weekendDayHeader: {
    backgroundColor: '#658ee6',
  },
  header: {
    fontWeight: '600',
    color: '#495873',
    margin: '0',
  },
  dot: {
    width: '4px',
    height: '4px',
    backgroundColor: '#86a6eb',
    borderRadius: '100%',
    margin: '0 8px',
  },
  whiteDot: {
    color: '#fff',
  },
  whiteColor: {
    // unfortunately doing this becomes necessary due the button being used overrides the styling for the icon.
    color: '#fff !important',
  },
  editBtn: {
    flex: '1',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  grow: {
    flex: '1',
  },
};

export default styles;
