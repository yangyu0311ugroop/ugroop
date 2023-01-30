const styles = {
  root: {
    padding: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  grow: {
    flex: '1',
  },
  fromNow: {
    paddingLeft: 2,
  },
  closeButton: {
    position: 'absolute',
    top: 24,
    right: 24,
  },
  headline: {
    '& > h5': {
      width: '100%',
      color: '#606574',
      '& strong': {
        color: '#2b344d',
      },
    },
  },
  content: {
    paddingBottom: 0,
  },
  headlineContent: {
    padding: '8px 16px',
    border: '1px solid #e3e9ef',
    borderRadius: 4,
  },
  icon: {
    padding: '0 2px 0 4px',
    color: '#2b344d',
  },
  pendingStatus: {
    borderRadius: 2,
    padding: '4px 24px',
    border: '1px solid #7097EB',
    cursor: 'auto',
  },
  cancelledStatus: {
    borderRadius: 2,
    padding: '4px 24px',
    border: '1px solid #D75B7F',
    cursor: 'auto',
  },
  acceptedStatus: {
    borderRadius: 2,
    padding: '4px 24px',
    border: '1px solid #8ABD84',
    cursor: 'auto',
  },
  Hr: {
    margin: '24px -2px',
  },
  subTitle: {
    fontSize: '14px !important',
    fontWeight: 400,
  },
  personalMessage: {
    border: '1px solid #e3e9ef',
    padding: '6px',
  },
};

export default styles;
