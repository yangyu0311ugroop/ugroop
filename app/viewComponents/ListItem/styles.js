const styles = theme => ({
  root: {
    width: '100%',
  },
  container: {
    padding: '8px 16px',
  },
  secondColumn: {
    textAlign: 'right',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'inherit',
    },
  },
  grow: {
    flex: '1',
  },
});

export default styles;
