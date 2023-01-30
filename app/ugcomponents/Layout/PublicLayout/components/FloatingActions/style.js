const styles = () => ({
  root: {},
  item: {
    zIndex: 300,
    cursor: 'pointer',
    position: 'fixed',
    transform: 'scale(0)',
    top: 'calc(187px)',
    transition: 'all 100ms ease-in-out',
  },
  itemNoRyi: {
    top: 'calc(70px) !important',
  },
  actionsRoot: {
    left: 8,
    top: 65,
    zIndex: 1000,
    position: 'fixed',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    '& > button': {
      boxShadow:
        '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
    },
  },

  actionOpen: {
    height: 400,
    '& > button:not(:last-child)': {
      transform: 'scale(1)',
    },
  },

  divider: {
    borderRight: '1px solid #fff',
    height: 16,
    marginTop: 'auto',
    marginBottom: 'auto',
  },

  textRYI: {
    color: '#FFF',
    marginLeft: 4,
  },
});
const style = theme => ({
  ...styles(theme),
  '@media print': {
    ...styles(theme),
    actionsRoot: {
      display: 'none',
    },
  },
});

export default style;
