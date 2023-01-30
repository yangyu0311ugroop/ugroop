const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  orgSetting: {
    borderRadius: 4,
    color: '#013c61',
    width: '100%',
    display: 'inline-block',
    padding: '4px 0 4px 3px',
    margin: '0',
    textDecoration: 'none',
    textAlign: 'left',
    '&:hover': {
      backgroundColor: '#e8e8e8',
      textDecoration: 'none',
    },
  },
  rolesKnownAsEllipsis: {
    width: '70px',
  },
  listItemStyle: {
    padding: '0 !important',
    marginLeft: 6,
  },
  selected: {
    background: '#e4f0f6', // '#e8e8e8',
  },
  orgRoleClass: {
    maxWidth: 250,
    fontWeight: 600,
    fontSize: 14,
  },
  photoBackground: {
    background: '#9e9e9e45',
    borderRadius: 4,
    minHeight: 24,
  },
  photo: {
    minWidth: 32,
    minHeight: 24,
  },
  container: {
    borderRadius: 4,
    color: '#013c61',
    width: '100%',
    margin: '0',
    textDecoration: 'none',
    textAlign: 'left',
    /* '&:hover': {
      backgroundColor: '#e8e8e8',
      textDecoration: 'none',
    }, */
  },
  contHover: {
    '&:hover': {
      backgroundColor: '#e8e8e8',
      textDecoration: 'none',
    },
  },
};

export default styles;
