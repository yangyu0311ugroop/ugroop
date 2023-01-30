const style = ({ colors }) => ({
  btnLink: {
    margin: '16px 0px',
    borderRadius: '2px',
    padding: '8px 16px',
    fontWeight: '600',
    display: 'inline-block',
    position: 'relative',
    textTransform: 'capitalize',
  },
  notActive: {
    color: colors.gray,
    '&:hover': {
      color: colors.dune,
      textDecoration: 'none',
    },
    textDecoration: 'none',
    cursor: 'pointer',
  },
  active: {
    color: colors.dune,
    '&:hover': {
      color: colors.dune,
      textDecoration: 'none',
    },
    textDecoration: 'none',
    cursor: 'pointer',
  },
  outlineOrange: {
    border: {
      width: '1px',
      style: 'solid',
      color: colors.orange,
    },
    color: colors.orange,
    '&:hover': {
      backgroundColor: colors.orange,
      color: '#fff',
      '& a:hover': {
        color: '#fff',
        textDecoration: 'none',
      },
    },
  },
});

export default style;
