const styles = {
  root: {},
  grow: {
    flex: '1',
  },

  left: {
    width: 55,
  },
  eventIcon: {
    minWidth: 70,
    background: '#f9f9f9',
    padding: 4,
    textAlign: 'center',
    borderRadius: 8,
    color: '#7b838e',
  },
  eventIconMiddle: {
    minWidth: 36,
    textAlign: 'center',
    background: '#f9f9f9',
    borderRadius: 6,
  },
  eventHeightMiddle: {
    height: 36,
    width: 1,
  },
  eventHeight: {
    height: 44,
    width: 1,
  },
  eventIconSm: {
    width: 60,
  },

  item: {
    cursor: 'pointer',
    marginBottom: 1,
    // borderTop: '1px solid transparent',
    // borderBottom: '1px solid transparent',
    // position: 'relative',

    transition: '200ms cubic-bezier(.08,.52,.52,1) background-color',

    '&:hover': {
      backgroundColor: '#e9f5ff',
    },
    '&:hover $eventIcon': {
      backgroundColor: 'white',
    },
    '&:hover $eventIconMiddle': {
      backgroundColor: 'white',
    },
  },
  itemClickable: {
    cursor: 'pointer',
  },
  itemBadge: {
    marginBottom: 1,
    // borderTop: '1px solid transparent',
    // borderBottom: '1px solid transparent',
    position: 'relative',

    transition: '200ms cubic-bezier(.08,.52,.52,1) background-color',
    '& $eventIcon': {
      backgroundColor: 'transparent',
    },
    '&:hover $eventIcon': {
      backgroundColor: 'transparent',
    },
  },
  itemActive: {
    borderLeft: '2px solid #0077d6',
    backgroundColor: '#e9f5ff',

    '&:hover': {
      backgroundColor: '#e9f5ff',
    },
    '& $eventIcon': {
      backgroundColor: 'white',
    },
    '&:hover $eventIcon': {
      backgroundColor: 'white',
    },
  },

  tooltip: {
    background: 'white',
    boxShadow: '0 3px 12px rgb(143 149 156)',
    padding: 0,
    fontWeight: 400,
  },
  popper: {
    opacity: 1,
  },

  hover: {
    '&:hover': {
      color: '#0366d6',
    },
  },

  event: {
    background: 'white',
    color: '#0a2644',
    border: '1px solid rgb(209, 213, 221)',
    borderRadius: 4,
    padding: 16,
    minHeight: 30,
    boxShadow: 'unset',
    transition: '400ms cubic-bezier(.08,.52,.52,1) border',
    cursor: 'pointer',

    '&:hover': {
      borderColor: '#98b9ff',
      background: '#fafbfc',
    },
  },

  selected: {
    borderColor: 'rgb(148 193 228)',
    boxShadow: '0px 0px 3px 1px #c2e4ff',
    background: 'rgb(244 249 253)',

    '&:hover': {
      background: '#eef7ff',
    },
  },
  smallBadge: {
    fontWeight: 500,
    color: '#c90000',
    background: '#ffe1df',
    borderRadius: 5,
    padding: '2px 8px',
    fontSize: 10,
  },
  offsetTop: {
    marginTop: -8,
  },
  amountsForm: {
    width: 300,
  },
};

export default styles;
