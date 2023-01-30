const styles = {
  root: {},
  grow: {
    flex: '1',
  },

  header: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 600,
    color: '#9c9c9c',
  },
  smallText: {
    fontSize: 12,
    padding: '2px 8px',
    minHeight: 'unset',
    fontWeight: 500,
  },
  noContent: {
    color: '#9c9c9c',
    fontStyle: 'italic',
    fontSize: 12,
  },

  room: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    padding: '3px 8px 1px',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  heading: {
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: 500,
    textAlign: 'center',
    color: '#8a8a8a',
    border: '1px solid gainsboro',
    borderBottom: 'none',
  },
  control: {
    textAlign: 'center',
    height: 22,
  },
  check: {
    border: '1px solid #8BC34A',
  },
  cross: {
    border: '1px solid #ffa0a0',
  },

  item: {
    margin: '0 -16px',
    padding: '4px 16px 8px',
    cursor: 'pointer',
    borderTop: '1px solid transparent',
    borderBottom: '1px solid transparent',
    position: 'relative',

    transition:
      '400ms cubic-bezier(.08,.52,.52,1) background-color, 400ms cubic-bezier(.08,.52,.52,1) border-top-color, 400ms cubic-bezier(.08,.52,.52,1) border-top-color, 400ms cubic-bezier(.08,.52,.52,1) opacity',

    '&:hover': {
      backgroundColor: '#fafbfc',
      borderTop: '1px solid #dddfe2',
      borderBottom: '1px solid #dddfe2',
    },
  },
  itemActive: {
    marginLeft: -18,
    // color: '#fe7a5c',
    borderLeft: '2px solid #98b9ff',
    backgroundColor: '#fafbfc',

    '&:hover': {
      cursor: 'unset',
      borderTop: '1px solid transparent',
      borderBottom: '1px solid transparent',
    },
  },

  badge: {
    background: '#efefef',
    borderRadius: 3,
    color: '#607D8B',
    fontSize: 12,
    fontWeight: 500,
    padding: '0px 4px',
  },
};

export default styles;
