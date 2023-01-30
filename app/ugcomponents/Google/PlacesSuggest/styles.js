const styles = {
  root: {
    '& > div': {
      width: '100%',
      position: 'relative',
      '& > ul': {
        padding: 0,
        marginTop: 8,
        width: '100%',
        borderRadius: 4,
        listStyle: 'none',
        border: 'solid 1px #e4e6e8',
        boxShadow: '0 2px 5px 0 #e4e6e8',
        '& > li': {
          padding: '4px 16px',
          fontSize: 14,
          backgroundColor: '#fff',
          '&:hover': {
            backgroundColor: '#f6f8fa',
          },
        },
      },
    },
  },
  absolute: {
    '& > div > ul': {
      position: 'absolute',
      zIndex: 999,
    },
  },
  activeClassName: {
    backgroundColor: '#f6f8fa !important',
  },
};

export default styles;
