const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  hr: {
    height: '0px',
    backgroundColor: '#e3e9ef',
    margin: '16px 0 0',
    borderTop: '1px solid #e3e9ef',
  },

  activityContainer: {
    marginLeft: -16,
    marginTop: 8,
    width: 'calc(100% + 32px)',
    maxHeight: '216px',
    overflow: 'hidden',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#e3e9ef',
    },
  },
  btn: {
    margin: '0',
    borderRadius: '4px',
  },
  subHeaderCard: {
    padding: '0 10px',
  },
};

export default styles;
