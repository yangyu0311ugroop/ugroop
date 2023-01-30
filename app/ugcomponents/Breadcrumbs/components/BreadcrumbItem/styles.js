const styles = ({ colors, fontSize }) => ({
  stackItem: {
    padding: '16px 32px',
    display: 'block',
  },
  stackContainer: {
    padding: 16,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '8px',
    '&:first-child': {
      marginLeft: '0',
    },
  },
  linkText: {
    fontWeight: 'normal',
    color: colors.breadcrumb.normal,
    fontSize: fontSize.breadcrumb.item,
    textDecoration: 'none',
    '&:hover': {
      color: colors.breadcrumb.normal,
      textDecoration: 'underline',
    },
    '&:visited': {
      colors: colors.breadcrumb.normal,
    },
  },
  chev: {
    marginLeft: '8px',
    color: colors.breadcrumb.chevron,
    fontSize: '15px',
  },
  homeActive: {
    fontWeight: 'normal',
    color: colors.breadcrumb.active,
    textDecoration: 'none',
    '&:hover': {
      color: colors.breadcrumb.active,
      textDecoration: 'underline',
    },
    '&:visited': {
      colors: colors.breadcrumb.active,
    },
  },
  home: {
    fontSize: fontSize.breadcrumb.item,
  },
  darkMode: {
    color: 'white',
    textDecoration: 'none',
    '&:hover': {
      color: 'white',
      textDecoration: 'underline',
    },
    '&:visited': {
      color: 'white',
    },
  },
});

export default styles;
