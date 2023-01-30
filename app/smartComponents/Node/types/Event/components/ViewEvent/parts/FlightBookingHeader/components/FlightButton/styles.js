const styles = {
  root: {},
  grow: {
    flex: '1',
  },

  offsetTop: {
    marginTop: -8,
  },
  ruler: {
    width: 1,
    background: '#b2b2bf',
    height: '100%',
  },
  detail: {
    paddingLeft: 76,
  },
  card: {
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
  },
  arrowHover: {
    '& $nextButton': {
      transform: 'translateX(-2px)',
    },
    '&:hover $nextButton': {
      transform: 'translateX(2px)',
    },
  },
  nextButton: {
    transition: '300ms cubic-bezier(.08,.52,.52,1) transform',
  },

  time: {
    textAlign: 'right',
    minWidth: 60,
  },
};

export default styles;
