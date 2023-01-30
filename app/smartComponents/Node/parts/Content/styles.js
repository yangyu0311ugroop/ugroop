const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  disabled: {
    opacity: 0.5,
  },
  lineThrough: {
    textDecoration: 'line-through',
  },
  default: {},
  bold: {
    fontWeight: 500, // 'bold',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    wordBreak: 'break-all',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  headingGrid: {
    minHeight: 44,
  },
  titleGrid: {
    minHeight: 28,
  },
  defaultGrid: {
    minHeight: 28,
  },
  underline: {
    textDecoration: 'underline',
  },
  link: {
    '&:hover, &:active, &:focus': {
      textDecoration: 'unset',
    },
  },
  iconHidden: {
    visibility: 'hidden',
  },
  content: {
    borderRadius: 4,
    color: 'inherit',
  },
  contentDarkMode: {
    borderRadius: 4,
    color: 'white',
  },
  hover: {
    cursor: 'pointer',
    transition: '.2s ease-in-out',

    '&:hover $content': {
      backgroundColor: 'rgb(250, 250, 250)',
    },

    '&:hover $iconHidden': {
      visibility: 'visible',
    },
  },
  hoverDarkMode: {
    '&:hover $content': {
      background: '#FFFFFF20',
    },
  },
  editForm: {
    textAlign: 'right',
    fontSize: 14,
    fontWeight: 300,
    color: 'grey',
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
  fullWidth: {
    width: '100%',
  },
};

export default styles;
