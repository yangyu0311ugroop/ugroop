const styles = {
  root: {},
  grow: {
    flex: '1',
  },

  item: {
    padding: '1px 16px',
    cursor: 'pointer',

    transition:
      '400ms cubic-bezier(.08,.52,.52,1) background-color, 400ms cubic-bezier(.08,.52,.52,1) boxShadow',
  },
  itemHover: {
    '&:hover': {
      backgroundColor: '#fafbfc',
      boxShadow: '0 1px 0 0 #e3e9ef, 0 -1px 0 0 #e3e9ef',
      zIndex: 2,
    },
  },
  active: {
    marginLeft: -2,
    // color: '#fe7a5c',
    borderLeft: '2px solid #98b9ff',
    backgroundColor: '#fafbfc',
    boxShadow: '0 1px 0 0 #e3e9ef, 0 -1px 0 0 #e3e9ef',

    '&:hover': {
      cursor: 'unset',
    },
  },
  hovered: {
    backgroundColor: '#fafbfc',
    boxShadow: '0 1px 0 0 #e3e9ef, 0 -1px 0 0 #e3e9ef',
    zIndex: 2,
  },

  detailOffset: {
    position: 'absolute',
    bottom: 20,
    background: 'white',
    fontSize: 14,
    zIndex: 5,
    borderRadius: 8,
    width: 210,
    transform: 'translate(-50%, 0)',
    boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)',

    opacity: 0.9,
    '&:hover': {
      opacity: 1,
      boxShadow: '0 2px 7px 1px rgba(0,0,0,0.3)',
    },
  },
  detailHoveredIndex: {
    zIndex: 6,
    opacity: 1,
    boxShadow: '0 2px 7px 1px rgba(0,0,0,0.3)',
  },
  placementBottom: {
    position: 'relative',

    '&:before': {
      content: '""',
      width: 0,
      height: 0,
      position: 'absolute',
      border: '14px solid transparent',
      borderTop: '14px solid #e1e1e2',
      right: 'calc(50% - 14px)',
      bottom: -28,
    },

    '&:after': {
      content: '""',
      width: 0,
      height: 0,
      position: 'absolute',
      border: '12px solid transparent',
      borderTop: '12px solid #fff',
      right: 'calc(50% - 12px)',
      bottom: -24,
    },
  },
  linkButton: {
    color: '#427fed',
    background: 'unset',
    boxShadow: 'unset',
    minHeight: 'unset',
    fontSize: 13,
    padding: '0 4px',
    marginLeft: -4,
    zIndex: 1,

    '&:hover': {
      background: 'unset',
      textDecoration: 'underline',
    },
  },
  dayContent: {
    padding: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    zIndex: 3,
  },

  ellipsisDiv: {
    width: 186,
  },
};

export default styles;
