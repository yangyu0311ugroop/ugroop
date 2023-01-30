const styles = {
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
  grow: {
    flex: '1',
  },
  role: {
    color: 'grey',
  },
  photo: {
    minWidth: 32,
    minHeight: 32,

    '& img': {
      width: 24,
      height: 24,
    },
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
    width: '100%',
    display: 'inline-block',
    margin: '-2px 0',
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
    backgroundColor: '#e4f0f6',
    color: '#026aa7',
    textDecoration: 'none',

    '&:hover': {
      backgroundColor: '#e4f0f6',
      textDecoration: 'none',
    },
  },

  darkMode: {
    background: 'unset',
    '&:hover': {
      background: 'unset',
    },
  },
  activeDarkMode: {
    background: 'unset',
    '&:hover': {
      background: 'unset',
    },
  },
};

export default styles;
