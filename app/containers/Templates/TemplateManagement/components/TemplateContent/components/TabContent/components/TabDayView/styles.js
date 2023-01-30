const styles = {
  root: {},
  grow: {
    flex: '1',
  },
  content: {
    transition: 'color ease-in .2s',
  },
  actionButton: {
    background: 'white',
    color: '#0a2644',
    border: '1px solid rgb(209, 213, 221)',
    borderRadius: 4,
    padding: 16,
    minHeight: 30,
    boxShadow: 'unset',

    '&:hover': {
      borderColor: '#fe7a5c',
      background: 'white',
    },
    '&:hover $content': {
      color: '#fe7a5c',
    },
  },

  header: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 600,
    color: '#9c9c9c',
  },

  left: {
    width: 276,
    marginRight: 47,
  },
  right: {
    width: 306,
  },

  kbd: {
    display: 'inline-block',
    border: '1px solid #ccc',
    borderRadius: 4,
    padding: '0.1em 0.5em',
    margin: '0 0.2em',
    boxShadow: '0 1px 0px rgba(0, 0, 0, 0.2), 0 0 0 2px #fff inset',
    backgroundColor: '#f7f7f7',
  },

  button: {
    background: 'white',
    border: 'unset',
    borderLeft: '1px solid #dbdee4',
    color: '#0a2644',
    padding: '2px 12px',
    paddingTop: 4,
    borderRadius: 'unset',
    boxShadow: 'unset',

    '&:hover': {
      background: '#ebedf0',
      borderColor: '#dbdee4',
    },
    '&:disabled': {
      boxShadow: 'unset',
      background: 'white',
      color: 'gainsboro',
    },
  },
  border: {
    border: '1px solid #dbdee4',
    borderRadius: 4,
    overflow: 'hidden',
  },
  noBorderLeft: {
    borderLeft: 'none',
  },

  date: {
    color: '#9c9c9c',
    fontSize: 12,
  },

  padding: {
    paddingLeft: 4,
    paddingRight: 4,
  },
  contentWidth: {
    width: '100%',
  },
  marginLeftTop: {
    marginLeft: -47,
  },
  marginLeftBottom: {
    marginLeft: -44,
  },

  peopleCardXs: {
    marginTop: 8,
  },

  stickyGrid: {
    overflowY: 'auto',
    margin: -12,
    paddingLeft: '16px !important',
    paddingRight: '16px !important',
    paddingBottom: '16px !important',
  },
  stickyGridEdit: {
    maxHeight: 'calc(100vh - 204px)',
    padding: '16px !important',
    paddingBottom: '8px !important',
  },
  stickyGridRead: {
    maxHeight: 'calc(100vh - 152px)',
  },
};

export default styles;
