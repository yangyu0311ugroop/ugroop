const styles = ({ colors }) => ({
  root: {
    // paddingLeft: 8,
  },
  paddingLeft: {
    paddingLeft: 8,
  },
  hover: {
    '&:hover': {
      background: '#f6f8fa',
    },
  },
  fullWidth: {
    width: '100%',
  },
  grow: {
    flex: '1',
  },
  role: {
    color: 'grey',
  },
  photo: {
    minWidth: 32,
    minHeight: 32,
  },
  photoBackground: {
    background: '#9e9e9e45',
    borderRadius: 4,
    minHeight: 24,
  },
  ellipsis: {
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  link: {
    borderRadius: 4,
    color: '#013c61',
    display: 'block',
    textDecoration: 'none',

    '&:hover': {
      backgroundColor: '#e8e8e8',
      textDecoration: 'none',
    },
    '&:active, &:focus': {
      textDecoration: 'none',
    },
  },

  active: {
    fontWeight: 500,
    backgroundColor: colors.listActiveColor,
    color: colors.listActiveBlue,
    textDecoration: 'none',

    '&:hover': {
      backgroundColor: colors.listActiveColor,
      textDecoration: 'none',
    },
  },
});

export default styles;
