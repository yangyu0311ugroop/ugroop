const style = ({ colors }) => ({
  root: {},
  items: {
    padding: '8px 24px',
    borderLeft: `1px solid ${colors.mercury}`,
    listStyle: 'none',
    fontSize: '14px',
    '& > a': {
      color: '#aaa',
      textDecoration: 'none',
    },
  },
  itemSelected: {
    borderLeft: '1px solid #000',
    '& > a': {
      color: '#000',
    },
  },
  itemList: {
    padding: '0',
  },
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
