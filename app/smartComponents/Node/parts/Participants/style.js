const styles = theme => ({
  badgeRoot: {
    marginRight: 16,
  },
  badge: {
    alignContent: 'baseline',
    top: 0,
    right: -16,
    height: 22,
    width: 22,
    fontSize: 14,
    fontWeight: 600,
    paddingTop: 1,
    paddingLeft: 1,
    color: 'white',
  },
  complete: {
    backgroundColor: theme.colors.gray,
  },
  pending: {
    backgroundColor: theme.colors.pending,
  },
});

export default styles;
