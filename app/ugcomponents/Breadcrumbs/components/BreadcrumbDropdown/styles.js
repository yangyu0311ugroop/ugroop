const styles = ({ colors, fontSize }) => ({
  btn: {
    padding: 0,
    margin: 0,
    minWidth: 'auto',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  link: {
    padding: '16px 32px',
    display: 'block',
    fontWeight: '600',
    color: colors.breadcrumb.normal,
    fontSize: fontSize.breadcrumb.item,
    '&:hover': {
      color: colors.breadcrumb.normal,
      textDecoration: 'none',
    },
    '&:visited': {
      colors: colors.breadcrumb.normal,
    },
  },
  icon: {
    marginLeft: '16px',
    color: colors.breadcrumb.chevron,
    fontSize: '15px',
  },
});

export default styles;
