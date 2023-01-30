const styles = {
  root: {},
  grow: {
    flex: '1',
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
  btn: {
    width: '100%',
    backgroundColor: '#ebedf0',
  },
  smGrid: {
    backgroundColor: '#ebedf0',
  },
};

export default styles;
