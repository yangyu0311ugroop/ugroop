const styles = {
  root: {},
  grow: {
    flex: '1',
  },

  button: {
    borderRadius: 4,
    boxShadow: 'unset',
    background: 'unset',
    padding: 8,
    transition: '100ms cubic-bezier(.08,.52,.52,1) background-color',

    '&:hover': {
      backgroundColor: '#fafbfc',
    },
  },
};

export default styles;
