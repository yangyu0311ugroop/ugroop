const styles = {
  root: {},
  grow: {
    flex: '1',
  },

  buttonSm: {
    position: 'relative',
    width: '100%',
    borderRadius: 4,
    boxShadow: 'unset',
    color: '#4c5673',
    background: 'unset',
    transition: '100ms cubic-bezier(.08,.52,.52,1) background-color',

    '&:hover': {
      backgroundColor: '#fafbfc',
    },
  },

  activeIcon: {
    minWidth: 20,
  },
  hourText: {
    minWidth: 60,
  },
};

export default styles;
