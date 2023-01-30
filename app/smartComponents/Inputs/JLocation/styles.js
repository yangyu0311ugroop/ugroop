const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  popper: {
    border: 'unset',
    marginTop: 'unset',
    // minWidth: 335,
    // maxWidth: 335,
  },

  relative: {
    position: 'relative',
  },

  menu: {
    minWidth: 200,
    maxWidth: 200,
    borderRight: '1px solid gainsboro',
  },
  menuFull: {},
  destinations: {
    minWidth: 90,
    maxWidth: 90,
  },

  item: {
    cursor: 'pointer',
    padding: '4px 8px',
  },
  itemHover: {
    transition: '200ms cubic-bezier(.08,.52,.52,1) background',

    '&:hover': {
      background: '#d9f3ff',
    },
  },

  destination: {
    minWidth: 90,
    cursor: 'pointer',

    '&:hover': {
      background: '#d9f3ff',
    },
  },

  navigationItem: {
    background: '#f2fbff',
  },

  borderTop: {
    borderTop: '1px solid gainsboro',
  },
  empty: {},

  menuFooter: {
    borderTop: '1px solid gainsboro',
    background: '#f3f3f3',
    paddingLeft: 10,
  },
};

export default styles;
