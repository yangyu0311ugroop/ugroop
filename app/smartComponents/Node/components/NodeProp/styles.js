const style = {
  root: {},
  grow: {
    flex: '1',
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  relative: {
    position: 'relative',
  },
  flex: {
    display: 'flex',
  },
  clearBtn: {
    border: '1px solid #b1bac4',
  },
  inline: {
    paddingLeft: 8,
  },
  lineThrough: {
    textDecoration: 'line-through',
  },

  default: {
    wordBreak: 'break-word',
  },

  bold: {
    fontWeight: 500,
  },
  heading: {
    // wordBreak: 'break-word',
    fontWeight: 500,
    fontSize: 20,
  },
  title: {
    wordBreak: 'break-word',
    fontWeight: 500, // 'bold',
    fontSize: 16,
  },
  secondary: {
    fontSize: 12,
  },

  headingGrid: {
    // margin: '4px 0',
  },
  titleGrid: {
    margin: '6px 0',
  },
  defaultGrid: {
    minHeight: 28,
  },
  secondaryGrid: {
    minHeight: 27,
  },

  underline: {
    textDecoration: 'underline',
  },
  iconHidden: {
    visibility: 'hidden',
  },
  content: {
    borderRadius: 4,
    color: 'inherit',
  },
  darkMode: {
    borderRadius: 4,
    color: 'white',

    '&:hover': {
      color: 'white',
    },
  },
  hover: {
    '&:hover $iconHidden': {
      visibility: 'visible',
    },
  },
  hoverDarkMode: {
    '&:hover': {
      color: 'white',
    },
  },
  editForm: {
    right: 0,
    bottom: -34,
    zIndex: 99,
    position: 'absolute',
  },
  textDarkMode: {},
  nowrap: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '300px',
    paddingRight: 48,
    textAlign: 'left',
  },
  input: {},

  ellipsis: {
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  advanceEdit: {
    flex: 1,
    paddingRight: 4,
  },

  editBtn: {
    border: '1px solid #86a6eb',
    boxShadow: '0 1px 0 0 #7f9ad5',
  },
  url: {
    color: '#595F6F',
    display: 'flex',
    overflow: 'hidden',
    fontSize: 12,
    alignItems: 'baseline',
    fontFamily: 'IBM Plex Sans, sans-serif',
    fontWeight: 400,
  },
};

const styles = {
  ...style,
  '@media print': {
    ...style,
    darkMode: {
      borderRadius: 4,
      color: 'white !important',

      '&:hover': {
        color: 'white',
      },
    },
  },
};
export default styles;
