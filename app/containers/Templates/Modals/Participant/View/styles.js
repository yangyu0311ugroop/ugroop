const styles = ({ colors }) => ({
  content: {
    background: colors.lightGray,
  },
  chip: {
    height: 34,
    marginBottom: 3,
    backgroundColor: '#fafafa',
    border: '1px solid #ddd',
    '&:hover, &:focus': {
      backgroundColor: '#eee',
    },
    '&:active': {
      backgroundColor: '#dedede',
    },
  },
  textNoWrap: {
    whiteSpace: 'nowrap',
  },
});

export default styles;
