export const styles = ({ colors }) => ({
  listItemStyle: {
    padding: '4px 16px 4px 16px',
  },
  listContainer: {
    marginLeft: '-4px',
    marginRight: '-4px',
  },
  active: {
    background: colors.listActiveColor,
    color: colors.listActiveBlue,
  },
  activeText: {
    fontWeight: 500,
    color: `${colors.listActiveBlue} ! important`,
  },
  hoverOver: {
    background: colors.listMouseOverColor,
    cursor: 'pointer',
  },
  headerRoot: {
    borderRadius: '4px',
  },
  linkText: {},
  listItemText: {
    fontSize: 14,
    paddingLeft: 10,
    textTransform: 'capitalize',
    color: colors.listFontColor,
  },
});
