const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  subNav: {
    backgroundColor: '#fafbfc',
    borderBottom: '1px solid #eee',
    paddingBottom: 4,
    paddingTop: 4,
  },
  subNavItem: {},
  link: {
    color: '#868686',

    '&:hover, &:active, &:focus': {
      color: '#24292e',
      textDecoration: 'none',
    },

    // reserve space for bold link when active https://stackoverflow.com/a/20249560/5155980
    '&:after': {
      display: 'block',
      content: 'attr(title)',
      fontWeight: 'bold',
      height: 0,
      overflow: 'hidden',
      visibility: 'hidden',
    },
  },
  active: {
    color: '#24292e',
    fontWeight: 'bold',
  },
};

export default styles;
