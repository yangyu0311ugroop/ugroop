const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  item: {},
  overlay: {
    borderRadius: 4,
  },
  personalContainer: {
    flex: 1,
    paddingRight: '24px !important',
  },
  countGridItem: {
    fontSize: '13px !important',
    paddingTop: '4px !important',
    color: '#607D8B',
  },
  hover: {
    borderRadius: 4,
    marginLeft: -8,
    marginRight: -8,
    paddingLeft: 8,
    paddingRight: 8,

    '&:hover': {
      backgroundColor: '#e8e8e8',
    },
  },
  createOrgDiv: {
    paddingLeft: 14,
  },
  createOrgText: {
    paddingLeft: 4,
  },
  createOrg: {
    marginLeft: 2,
  },
  ellipsisDiv: {
    width: '100%',
  },

  linkButton: {
    background: '#ecedf0',
    color: '#636363',
    padding: '2px 8px',
    boxShadow: 'unset',
    minHeight: 'unset',
    margin: 0,
    fontWeight: 500,

    '&:hover': {
      background: '#e0e0e0',
    },
  },
  newIcon: {
    paddingTop: 3,
    paddingLeft: 6,
  },

  link: {
    padding: '0 2px',
  },

  showMore: {
    color: '#9c9c9c',
    padding: '2px 8px',
    marginLeft: 4,
    marginTop: 8,
  },
  showMoreText: {
    color: '#385898',
    cursor: 'pointer',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
};

export default styles;
