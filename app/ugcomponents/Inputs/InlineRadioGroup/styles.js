const styles = {
  root: {
    fontSize: 14,
  },
  grow: {
    flex: '1',
  },
  icon: {
    fontSize: 14,
    color: 'grey',
  },
  iconHidden: {
    display: 'none',
  },
  hover: {
    position: 'relative',

    '&:hover $iconHidden': {
      display: 'inline',
      position: 'absolute',
      right: -20,
      top: -3,
      padding: '2px 4px',
      backgroundColor: 'rgb(250, 250, 250)',
    },
  },
  theDot: {
    fontWeight: 600,
  },
  selected: {
    // textDecoration: 'underline',
    fontWeight: 'bold',
  },
  loading: {
    animation: 'spin 1s linear infinite',
    display: 'inline-block',
  },
  paddingLeft: {
    paddingLeft: 4,
  },
  success: {
    color: '#47943c',
  },
  fade: {
    opacity: 0.6,
    transition: 'opacity ease-in-out .1s',

    '&:hover': {
      opacity: 1,
    },
  },
  roleEllipsis: {
    minWidth: '60px',
    marginBottom: -6,
  },
  labelStyle: {
    marginTop: 3,
    fontSize: 12,
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },
};

export default styles;
