const styles = ({ colors }) => ({
  root: {
    padding: '16px 8px',
    background: '#f6f8fa',
  },
  heading: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 600,
    color: '#9c9c9c',
    paddingTop: 2,
    paddingLeft: 4,
    paddingRight: 4,
    '& a': {
      color: 'unset',
    },
  },
  firstHeading: {
    paddingTop: 0,
  },

  grow: {
    flex: '1',
  },
  left: {
    width: 260,
    minWidth: 260,
    marginRight: 16,
  },
  ellipsisDiv: {
    width: 208,
  },

  link: {
    borderRadius: 4,
    color: '#013c61',
    width: '100%',
    display: 'inline-block',
    padding: '4px 0',
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
  linkXS: {
    fontSize: 16,
    borderRadius: 4,
    color: '#1a2b49',
    width: '100%',
    display: 'inline-block',
    padding: '4px 0',
    textDecoration: 'none',
    textAlign: 'center',

    '&:hover': {
      backgroundColor: '#e8e8e8',
      textDecoration: 'none',
    },
    '&:active, &:focus': {
      textDecoration: 'none',
    },
  },
  activeXS: {
    fontWeight: 500,
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'none',
    },
  },

  linkText: {
    padding: '0 4px',
  },

  triggerActive: {
    fontWeight: 500,
    background: colors.listActiveColor,
    textDecoration: 'none',
  },

  active: {
    fontWeight: 500,
    background: colors.listActiveColor,
    textDecoration: 'none',

    '&:hover': {
      background: colors.listActiveColor,
      textDecoration: 'none',
    },
  },

  pendingBadge: {
    background: '#607D8B',
    color: 'white',
    padding: '1px 3px',
    borderRadius: 2,
    fontSize: 12,
    fontWeight: 700,
  },

  content: {
    fontWeight: 500,
    color: '#636363',
  },

  paddingRight: {
    paddingRight: 16,
  },
  paddingLeft: {
    paddingLeft: 8,
  },
  leftHeadingPadding: {
    paddingLeft: 10,
  },

  templateImageContainer: {
    minHeight: 'unset',
  },
  tourPhoto: {
    width: 24,
    height: 24,
    overflow: 'hidden',
    background: '#9e9e9e45',
    borderRadius: 4,

    '& img': {
      height: 24,
      boxShadow: 'unset',
    },
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

  leftXS: {
    width: 'calc(100% + 16px)',
    margin: '0 -8px',
    padding: '6px 0',

    '-webkit-backdrop-filter': 'saturate(180%) blur(20px)',
    backdropFilter: 'saturate(180%) blur(20px)',
    background: 'rgba(255,255,255,0.8)',
    borderBottom: '1px solid rgb(209, 213, 221)',
  },

  noPaddingTop: {
    paddingTop: 0,
  },
});

export default styles;
