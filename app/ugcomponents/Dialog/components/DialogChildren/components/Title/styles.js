const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    margin: 0,
    paddingLeft: 0,
    paddingRight: 0,
    minWidth: 'unset',
    minHeight: 'unset',
    '& > span': {
      lineHeight: 0,
    },
    '&:hover': {
      backgroundColor: '#fff',
      '& i': {
        color: '#d75b7f',
      },
    },
  },
  close: {
    color: '#b6bbc9',
    cursor: 'pointer',
  },
  title: {
    margin: 0,
    width: '90%',
    fontWeight: 700,
    color: '#41485e',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textTransform: 'uppercase',
  },
};

export default styles;
