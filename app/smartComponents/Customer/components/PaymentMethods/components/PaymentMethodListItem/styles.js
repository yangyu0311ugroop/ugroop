const styles = ({ colors }) => ({
  root: {},
  grow: {
    flex: '1',
  },
  noCardInfo: {
    minHeight: 240,
    background: colors.ghostWhite,
  },
  badge: {
    background: '#d6ecff',
    borderRadius: 20,
    fontSize: 10,
    padding: 3,
    color: '#3d4eac',
  },
  actionButton: {
    position: 'relative',
    top: -6,
  },
  error: {
    color: 'red',
  },
});

export default styles;
