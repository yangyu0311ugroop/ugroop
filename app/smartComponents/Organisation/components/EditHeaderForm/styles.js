const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  grow: {
    flex: '1',
  },
  hover: {
    cursor: 'pointer',
    transition: '.2s ease-in-out',

    '&:hover ': {
      backgroundColor: 'rgb(250, 250, 250)',
    },

    '&:hover $iconHidden': {
      visibility: 'visible',
    },
  },
  iconHidden: {
    visibility: 'hidden',
  },
  editFormBtn: {
    textAlign: 'right',
    padding: 8,
  },
  heading: {
    fontSize: 36,
    padding: '24px 0 24px 0',
    wordBreak: 'break-word',
  },
  createAt: {
    color: '#b0b9c3',
    fontSize: 14,
  },
};

export default styles;
