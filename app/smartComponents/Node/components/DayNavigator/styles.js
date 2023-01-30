const styles = {
  root: {},
  grow: {
    flex: '1',
  },

  content: {
    transition: '400ms cubic-bezier(.08,.52,.52,1) color',
    fontSize: 12,
  },

  ellipsisDiv: {
    maxWidth: 190,
  },

  header: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 600,
    color: '#9c9c9c',
  },

  actionButton: {
    background: 'white',
    color: '#0a2644',
    border: '1px solid rgb(209, 213, 221)',
    borderRadius: 4,
    padding: 16,
    minHeight: 30,
    boxShadow: 'unset',
    transition: '400ms cubic-bezier(.08,.52,.52,1) border',

    '&:hover': {
      borderColor: '#98b9ff',
      background: '#fafbfc',
    },
    '&:hover $content': {
      // color: '#fe7a5c',
    },
  },

  arrowHover: {
    '& $nextButton': {
      transform: 'translateX(-2px)',
    },
    '&:hover $nextButton': {
      transform: 'translateX(2px)',
    },
    '& $prevButton': {
      transform: 'translateX(2px)',
    },
    '&:hover $prevButton': {
      transform: 'translateX(-2px)',
    },
  },

  minimiseButton: {
    background: 'white',
    border: 'unset',
    borderLeft: '1px solid #dbdee4',
    color: '#0a2644',
    padding: '4px 12px',
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
  prevButton: {
    transition: '300ms cubic-bezier(.08,.52,.52,1) transform',
  },
  nextButton: {
    transition: '300ms cubic-bezier(.08,.52,.52,1) transform',
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },
};

export default styles;
