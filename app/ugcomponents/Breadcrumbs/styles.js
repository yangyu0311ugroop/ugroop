const stylesheet = ({ colors }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  showMore: {
    padding: 0,
    margin: 0,
    minWidth: 'auto',
  },
  chev: {
    marginLeft: '16px',
    color: colors.breadcrumb.chevron,
    fontSize: '12px',
  },
  popoverContainer: {
    padding: 16,
  },
  darkMode: {
    color: 'white',
  },
});

export default stylesheet;
