const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  orgRolesEllipsis: {
    width: 250,
  },
  button: {
    border: 'none',
  },
  menu: {
    maxHeight: 360,
    overflow: 'auto',
    display: 'block',
    minWidth: 200,
  },
  listItemStyle: {
    // padding: '0 !important',
    marginLeft: 6,
  },
  selected: {
    background: '#e8e8e8',
  },
  personal: {
    borderRadius: 4,
    color: '#013c61',
    width: '100%',
    display: 'inline-block',
    padding: '4px 0 4px 3px',
    textDecoration: 'none',
    textAlign: 'left',
    '&:hover': {
      backgroundColor: '#e8e8e8',
      textDecoration: 'none',
    },
  },
  noWrapSpace: {
    whiteSpace: 'nowrap',
  },
  showMoreText: {
    color: '#385898',
    cursor: 'pointer',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
  showMore: {
    color: '#9c9c9c',
    padding: '2px 8px',
    marginLeft: 4,
    marginTop: 8,
  },
};

export default styles;
