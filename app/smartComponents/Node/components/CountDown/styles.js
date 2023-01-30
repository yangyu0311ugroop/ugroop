const styles = {
  actionButton: {
    background: 'white',
    borderLeft: '1px solid #dbdee4',
    color: '#0a2644',
    minHeight: 30,
    padding: '2px 12px',
    paddingTop: 4,
    borderRadius: 'unset',

    '&:hover': {
      background: '#ebedf0',
    },
  },
  unresolvedBadge: {
    background: '#607D8B',
    color: 'white',
    padding: '1px 3px',
    borderRadius: 2,
    fontSize: 10,
    fontWeight: 700,
  },
  discussionBadge: {
    marginLeft: 4,
    marginTop: -6,
  },
};

export default styles;
