const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  empty: {
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 32,
  },
  hr: {
    marginTop: 0,
    marginBottom: 16,
  },
  hrFirst: {
    borderTop: 'unset',
  },
  time: {
    color: '#888',
    marginTop: -2,
  },
  invitationItem: {
    marginTop: 8,
    padding: 8,
    position: 'relative',
    transition: 'background-color ease-in-out .1s',
  },
  invitationSeparator: {
    borderBottom: '1px solid #e3e9ef',
  },
  invitationItemHover: {
    backgroundColor: '#fafafa25',
  },
  transferBackground: {
    backgroundColor: '#fffbdd', // '#f5eaa6', // '#fffbdd',
  },
  invitationNotLastItem: {
    // borderBottom: '1px solid #e3e9ef',
  },
  invitationLastItem: {},
  invitationTitle: {
    marginTop: -4,
  },
  separator: {
    borderTop: '1px solid #e3e9ef',
    backgroundColor: '#fbfbfb',
    boxShadow: 'inset 0 0 5px 0 #e3e9ef',
    height: 12,
  },
  invitationSuccess: {
    borderRadius: 4,
    backgroundColor: '#edf2f4',
    color: '#9ac796',
    padding: '4px 16px',
  },
  invitationError: {
    borderRadius: 4,
    backgroundColor: '#edf2f4',
    color: '#e17391',
    padding: '4px 16px',
  },
  pm: {
    margin: 4,
  },
  actionButtons: {
    zIndex: 1,
    position: 'absolute',
    top: -24,
    right: 16,
  },
  iconButton: {
    boxShadow: '0 2px 4px 0 #e3e9ef',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
};

export default styles;
