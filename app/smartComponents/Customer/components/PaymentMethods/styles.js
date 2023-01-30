const styles = () => ({
  root: {},
  grow: {
    flex: '1',
  },
  noCardInfo: {
    minHeight: 240,
    // background: colors.ghostWhite,
  },
  cardSelectItem: {
    width: '100%',
    margin: '4px 0',
    padding: '4px 0',
    borderRadius: 4,
    border: '1px solid #9e9e9e',
    '& > span:first-child': {
      color: '#7097EB',
      alignSelf: 'flex-start',
    },
    '& > span:last-child': {
      width: '100%',
    },
  },
});

export default styles;
