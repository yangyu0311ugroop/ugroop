const style = ({ colors }) => ({
  icon: {
    color: colors.orange,
  },
  listItem: {
    borderBottom: `1px solid ${colors.mercury}`,
    padding: '16px 0px',
  },
  listItemText: {
    '& > h3': {
      fontWeight: '700',
    },
  },
  listItemContent: {
    display: 'block !important',
    paddingLeft: '40px',
  },
  listItemSelected: {
    borderBottom: '0px solid #000',
  },
});

export default style;
