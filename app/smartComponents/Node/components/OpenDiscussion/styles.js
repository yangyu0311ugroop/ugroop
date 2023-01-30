const styles = ({ colors }) => ({
  actionButton: {
    background: 'whitesmoke',
    // borderLeft: '1px solid #dbdee4',
    color: '#4c5673',
    minHeight: 30,
    padding: '4px 12px',
    borderRadius: 'unset',
    boxShadow: 'unset',

    '&:hover': {
      background: '#ebedf0',
    },
  },
  unresolvedBadge: {
    color: colors.offwhite,
    background: '#4CAF50',
    fontSize: 10,
    display: 'block',
    padding: '1px 3px',
    lineHeight: 1.1,
    borderRadius: 2,
    '-webkit-font-smoothing': 'subpixel-antialiased',
    pointerEvents: 'none',
  },
  discussionBadge: {
    position: 'absolute',
    top: 3,
    right: 1,
  },
});

export default styles;
