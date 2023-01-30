const styles = ({ breakpoints }) => ({
  root: {},
  grow: {
    flex: '1',
  },
  scrollPaper: {
    alignItems: 'flex-end',
  },
  paddingLeft: {
    paddingLeft: '12px !important',
  },
  paperFullWidth: {
    [breakpoints.down('xs')]: {
      margin: '0px !important',
      width: 'calc(90% + 40px)',
    },
  },
});

export default styles;
