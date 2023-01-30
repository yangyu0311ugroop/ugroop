const style = ({ colors }) => ({
  root: {
    width: '100%',
    margin: '0',
    border: '0 solid #fff',
    position: 'relative',
    '&:after': {
      content: '""',
      borderBottom: `1px solid ${colors.mercury}`,
      width: '100%',
      position: 'absolute',
      top: '0',
      left: '0',
    },
  },
});

export default style;
